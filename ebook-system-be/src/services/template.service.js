import Template from "../models/template.js";
import { htmlEmailToken } from "../utils/tem.html.js";

class TemplateService {
  async newTemplate({ tem_name }) {
    let check = await Template.findOne({
      where: { tem_name },
    });

    if (check) {
      return check;
    }

    const temp = htmlEmailToken();
    const newTem = await Template.create({
      tem_name,
      tem_html: temp,
    });

    return newTem;
  }

  async getTemplate({ tem_name }) {
    const template = await Template.findOne({
      where: { tem_name },
    });

    return template;
  }
}

export default TemplateService;
