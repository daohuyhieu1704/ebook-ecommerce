import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import UserHasRole from "../models/UserHasRole.js";
import Role from "../models/Role.js";
import { where } from "sequelize";
import ShoppingSession from "../models/ShoppingSession.js";

class UserService {
  async findUserByEmail({ email }) {
    try {
      let user = await User.findOne({ where: { email } });
      if (user) {
        return { error: "Email này đã tồn tại" };
      }
      return { user };
    } catch (error) {
      return { error };
    }
  }

  async NewUser({ email, password, firstName, lastName }) {
    try {
      let userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return { error: "Email này đã tồn tại" };
      }

      const newUser = await User.create({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        enable: 1,
      });

      const defaultRole = await Role.findOne({ where: { id: "default_user" } });

      if (defaultRole) {
        await UserHasRole.create({
          user_ID: newUser.id,
          role_ID: defaultRole.id,
        });
      }

      return {
        message: "Đăng ký thành công",
        user: {
          id: newUser.id,
          email: newUser.email,
          name: `${newUser.first_name} ${newUser.last_name}`,
        },
      };
    } catch (error) {
      console.error("Error in NewUser service:", error);
      return { error: error.message };
    }
  }

  async SignUp({ firstName, lastName, email, password }) {
    try {
      let check = await User.findOne({
        where: { email },
      });
      if (check) {
        return { error: "Email này đã tồn tại" };
      }

      let user = await User.create({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        enable: 1,
      });

      let role = await Role.findOne({
        where: { id: "customer" },
      });

      if (role) {
        await UserHasRole.create({
          user_ID: user.id,
          role_ID: role.id,
        });
      }

      await ShoppingSession.create({
        user_ID: user.id,
        total: 0,
      });

      return {
        status: "success",
        user: {
          id: user.id,
          email: user.email,
          name: `${firstName} ${lastName}`,
        },
      };
    } catch (error) {
      console.error("SignUp Error:", error);
      return { error: error.message };
    }
  }

  async UpdateInfo({ id, user }) {
    try {
      await User.update(
        { ...user, modified_at: Date.now() },
        {
          where: { id },
        }
      );
      let my_user = await my_user.findOne({ where: { id } });
      return { my_user };
    } catch (error) {
      return { error };
    }
  }

  async CreateAccount({ email, password, full_name }) {
    try {
      let check = await User.findOne({
        where: { email },
      });
      if (check) {
        return { error: "Email này đã tồn tại" };
      }
      password = crypto.createHash("sha256").update(password).digest("hex");

      let words = full_name.trim().split(/\s+/);
      let last_name = words.pop();
      let first_name = words.join(" ");

      let user = await User.create({ first_name, last_name, email, password });

      let role = await Role.findOne({
        where: { name: "admin" },
      });
      await UserHasRole.create({ user_ID: user.id, role_ID: role.id });
      return { user };
    } catch (error) {
      return { error };
    }
  }

  async GetAllAccounts() {
    try {
      let employeeRole = await Role.findOne({
        where: { id: "employee" },
        attributes: ["id"],
      });

      if (!employeeRole) {
        return { data: [] };
      }

      let employeeUsers = await User.findAll({
        attributes: [
          "id",
          "first_name",
          "last_name",
          "email",
          "phone_number",
          "birthday",
          "enable",
          "created_at",
        ],
        include: [
          {
            model: UserHasRole,
            required: true, // INNER JOIN
            attributes: [],
            where: { role_ID: employeeRole.id },
          },
        ],
      });

      const data = employeeUsers.map((user) => user.toJSON());

      return { data };
    } catch (error) {
      console.error("Error in GetAllAccounts:", error);
      return { error: error.message };
    }
  }

  async GetAccountByID({ id }) {
    try {
      let { first_name, last_name, email, phone_number, birthday } =
        await User.findByPk(id);

      return { first_name, last_name, email, phone_number, birthday };
    } catch (error) {
      return { error };
    }
  }

  async UpdateAccount({ id, user }) {
    try {
      await User.update(
        { ...user, modified_at: Date.now() },
        {
          where: { id },
        }
      );
      let { first_name, last_name, email, phone_number, birthday } =
        await User.findOne({ where: { id } });
      return { first_name, last_name, email, phone_number, birthday };
    } catch (error) {
      return { error };
    }
  }

  async DeleteAccount({ id }) {
    try {
      let my_user = await my_user.findOne({ where: { id } });
      await User.destroy({
        where: { id },
      });
      return { my_user };
    } catch (error) {
      return { error };
    }
  }
}

export default UserService;
