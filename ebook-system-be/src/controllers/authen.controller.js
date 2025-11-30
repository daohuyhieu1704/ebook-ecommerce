import HttpResponse from "../utils/HttpResponse.js";
import AuthenService from "../services/authen.service.js";
class AuthenController {
  postLogin = async (req, res, next) => {
    const { email, password } = JSON.parse(req.body);
    let data = await new AuthenService().LogIn({ email, password });
    if (data.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };

  postRefreshToken = async (req, res, next) => {
    const { refreshToken } = JSON.parse(req.body);
    let data = await new AuthenService().RefreshToken({ refreshToken });
    if (data.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };

  postLogout = async (req, res, next) => {
    const { refreshToken } = JSON.parse(req.body);

    let data = await new AuthenService().LogOut({ refreshToken });
    if (data.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };
}

export default AuthenController;
