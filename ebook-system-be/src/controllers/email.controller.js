import TemplateService from "../services/template.service.js";
import HttpResponse from "../utils/HttpResponse.js";
import OtpService from "../services/otp.service.js";

class EmailController {
  newTemplate = async (req, res, next) => {
    try {
      const { tem_name = null } = JSON.parse(req.body);
      let data = await new TemplateService().newTemplate({ tem_name });

      if (data.error) {
        return res.status(400).json(HttpResponse.error(data.error));
      }
      return res.json(HttpResponse.success(data));
    } catch (error) {
      return res.status(400).json(HttpResponse.error(error));
    }
  };

  destroyToken = async (req, res, next) => {
    const { token } = JSON.parse(req.body);
    let data = await new OtpService().destroyToken({ token });

    if (data.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success("Token destroyed"));
  };
}

export default EmailController;
