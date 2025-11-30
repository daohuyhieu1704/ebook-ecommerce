import HttpResponse from "../utils/HttpResponse.js";
import UserService from "../services/user.service.js";

class UserController {
  checkLoginEmailToken = async (req, res, next) => {
    const { full_name, password, token = null } = JSON.parse(req.body);
    const response = await new UserService().CheckLoginEmailToken({
      full_name,
      password,
      token,
    });
    if (response.data != null) {
      if (response.data.user == null) {
        return res.status(400).json(HttpResponse.error(response.data.error));
      }
    }
    return res.json(HttpResponse.success(response));
  };
  newUser = async (req, res, next) => {
    try {
      const { email, captcha } = JSON.parse(req.body);
      const data = await new UserService().NewUser({ email, captcha });
      if (data.error) {
        return res.status(400).json(HttpResponse.error(data.error));
      }
      return res.json(HttpResponse.success(data));
    } catch (error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
  };

  postSignUp = async (req, res, next) => {
    const { full_name, email, password } = JSON.parse(req.body);
    let data = await new UserService().SignUp({ full_name, email, password });

    if (data.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };

  patchUpdateInfo = async (req, res, next) => {
    const user = JSON.parse(req.body);
    let data = await new UserService().UpdateInfo({ id: req.user, user });

    if (data?.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };

  //CRUD ADMIN
  postAccount = async (req, res, next) => {
    const { full_name, email, password } = JSON.parse(req.body);
    let data = await new UserService().CreateAccount({
      full_name,
      email,
      password,
    });

    if (data.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };

  getAllAccounts = async (req, res, next) => {
    let data = await new UserService().GetAllAccounts();

    if (data?.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };

  getAccount = async (req, res, next) => {
    const user = JSON.parse(req.body);
    let data = await new UserService().GetAccountByID({ id: req.user, user });

    if (data?.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };

  patchUpdateAccount = async (req, res, next) => {
    const { id, ...user } = JSON.parse(req.body);
    let data = await new UserService().UpdateAccount({ id, user });

    if (data?.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };

  deleteAccount = async (req, res, next) => {
    const user = JSON.parse(req.body);
    let data = await new UserService().DeleteAccount({ id: req.user, user });

    if (data?.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };
}

export default UserController;
