import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import Token from "../models/Token.js";
import UserHasRole from "../models/UserHasRole.js";
import Role from "../models/Role.js";
import { where } from "sequelize";
import ShoppingSession from "../models/ShoppingSession.js";
import EmailService from "./email.service.js";
import OtpService from "./otp.service.js";

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

  async CheckLoginEmailToken({ full_name, password, token }) {
    try {
      let { otp_email: email, otp_token } =
        await new OtpService().checkEmailToken({ token });

      const hasUser = await this.findUserByEmail({ email });
      if (hasUser.user) {
        return { error: hasUser.error };
      }

      let newUser = await this.SignUp({
        full_name,
        email,
        password,
      });

      return newUser;
    } catch (error) {
      return { error };
    }
  }

  async NewUser({ email, captcha }) {
    try {
      let user = await User.findOne({ where: { email } });
      if (user) {
        return { error: "Email này đã tồn tại" };
      }
      const result = await new EmailService().sendEmailToken({
        email,
      });

      return {
        message: "Email hợp lệ",
        metadata: {
          token: result,
        },
      };
    } catch (error) {
      return { error };
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
