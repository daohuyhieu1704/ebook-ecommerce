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

  async SignUp({ full_name, email, password }) {
    try {
      let check = await User.findOne({
        where: { email },
      });
      if (check) {
        return { error: "Email này đã tồn tại" };
      }
      password = crypto.createHash("sha256").update(password).digest("hex");

      let words = full_name.trim().split(/\s+/);
      // Lấy last name bằng cách lấy phần tử cuối cùng trong mảng
      let last_name = words.pop();
      // Lấy first name bằng cách nối lại các phần tử còn lại trong mảng
      let first_name = words.join(" ");

      let user = await User.create({ first_name, last_name, email, password });

      //Tạo role mặc định là customer
      let role = await Role.findOne({
        where: { name: "customer" },
      });
      await UserHasRole.create({ user_ID: user.id, role_ID: role.id });
      //Tạo Shopping session cho Customer
      await ShoppingSession.create({ user_ID: user.id, total: 0 });
      return { user };
    } catch (error) {
      return error;
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

  // CRUD administration
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
      // Lấy last name bằng cách lấy phần tử cuối cùng trong mảng
      let last_name = words.pop();
      // Lấy first name bằng cách nối lại các phần tử còn lại trong mảng
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
      let role = await Role.findOne({
        where: { name: "admin" },
      });

      let list_accounts = await UserHasRole.findAll({
        where: { role_ID: role.dataValues.id },
      });
      let list_account_ids = list_accounts.map(
        (account) => account.dataValues.user_ID
      );

      let data = await Promise.all(
        list_account_ids.map(async (id) => {
          let user = await User.findByPk(id);

          return user.dataValues;
        })
      );
      if (data) {
        return { data };
      }
    } catch (error) {
      return { error };
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
