import jsonwebtoken from "jsonwebtoken";
import User from "../models/User.js";
import Token from "../models/Token.js";
import Role from "../models/Role.js";
import UserHasRole from "../models/UserHasRole.js";
import Permission from "../models/Permission.js";
import RoleService from "../services/role.service.js";
class AuthenService {
  async LogIn({ email, password }) {
    try {
      // 1. Tìm User & Check Pass (Giữ nguyên)
      let user = await User.findOne({ where: { email } });
      if (!user) throw new Error("User not found");

      const isMatch = await user.matchPassword(password);
      if (!isMatch) throw new Error("Wrong email or password");

      // 2. Query Role & Permission
      let userRoles = await UserHasRole.findOne({
        where: { user_ID: user.id },
        include: [
          {
            model: Role,
            required: true,
            include: [
              {
                model: Permission,
                required: false,
                through: { attributes: [] },
              },
            ],
          },
        ],
      });

      // 3. Xử lý dữ liệu Permissions & Tạo Start URL
      const permissions = [];
      let startUrl = "/"; // Mặc định nếu không tìm thấy quyền nào

      if (userRoles && userRoles.Role) {
        const rolePermissions = userRoles.Role.Permissions || [];

        // A. Lấy danh sách slug permissions
        rolePermissions.forEach((p) => permissions.push(p.slug));

        // B. Logic tạo đường dẫn từ quyền ĐẦU TIÊN (Priority High)
        // Giả sử quy tắc slug: "module.path" (vd: "system.employees", "user.book")
        if (rolePermissions.length > 0) {
          const firstSlug = rolePermissions[0].slug; // vd: "manager.employees"

          const parts = firstSlug.split("."); // Tách chuỗi: ["manager", "employees"]

          if (parts.length > 1) {
            // Lấy phần sau dấu chấm làm path
            startUrl = `/${parts[1]}`; // -> "/employees"
          } else {
            // Trường hợp slug không có dấu chấm (vd: "dashboard")
            startUrl = `/${parts[0]}`;
          }
        }
      }

      // 4. Tạo Token (Giữ nguyên)
      let user_id = user.id;
      let accessToken = jsonwebtoken.sign({ id: user_id }, "secret-key", {
        expiresIn: "150m",
      });
      let refreshToken = jsonwebtoken.sign({ id: user_id }, "secret-key", {
        expiresIn: "15000m",
      });

      await Token.destroy({ where: { user_ID: user_id } });
      await Token.create({ user_ID: user_id, refresh_token: refreshToken });

      let fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();
      let currentRoleId = userRoles?.Role?.id || null;

      // 5. Trả về kết quả (Kèm start_url đã tính toán)
      return {
        user: {
          id: user.id,
          name: fullName,
          email: user.email,
          role_id: currentRoleId,

          start_url: startUrl, // <--- URL BE đã tính toán xong
        },
        permissions: permissions,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async RefreshToken({ refreshToken }) {
    try {
      let check = jsonwebtoken.verify(refreshToken, "secret-key");
      let checkDB = await Token.findOne({
        where: {
          refresh_token: refreshToken,
          enable: true,
        },
      });
      if (checkDB) {
        let accessToken = jsonwebtoken.sign({ id: check.id }, "secret-key", {
          expiresIn: "15m",
        });

        return { accessToken, refreshToken };
      }

      return { error: "Không thể duy trì đăng nhập" };
    } catch (error) {
      throw error;
    }
  }

  async LogOut({ refreshToken }) {
    try {
      let check = jsonwebtoken.verify(refreshToken, "secret-key");
      let checkDB = await Token.findOne({
        where: {
          refresh_token: refreshToken,
          enable: true,
        },
      });
      if (checkDB) {
        await Token.update(
          { enable: false },
          {
            where: {
              refresh_token: refreshToken,
            },
          }
        );
        return { message: "Đăng xuất thành công" };
      }
      return { error: "Không thể đăng xuất" };
    } catch (error) {
      return { error };
    }
  }
}

export default AuthenService;
