import { randomInt } from "crypto";
import TemplateService from "./template.service.js";
import transporter from "../database/init.nodemailer.js";
import { replacePlaceholder } from "../utils/index.js";
import OtpService from "./otp.service.js";

const sendEmailLinkVerify = async ({
  html,
  email,
  subject = "Xác nhận đăng kí!",
  text = "Xác nhận",
}) => {
  try {
    const mailOptions = {
      from: '"ecommerce" <daohuyhieu1704@gmail.com>',
      to: email,
      subject: subject,
      text: text,
      html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return { error };
      }
      console.log("Email sent: " + info.messageId);
      return { info };
    });
  } catch (error) {
    console.log(error);
    return { error };
  }
};

class EmailService {
  async sendEmailToken({ email = null }) {
    try {
      const token = await new OtpService().newOtp({ email });
      const template = await new TemplateService().getTemplate({
        tem_name: "HTML_EMAIL_TOKEN",
      });

      if (!template) {
        return { error: "Template not found" };
      }

      const content = replacePlaceholder(template.tem_html, {
        token_verify: `${token.otp_token}`,
      });

      sendEmailLinkVerify({
        html: content,
        email,
        subject: "Xác nhận đăng kí!",
        text: "Xác nhận",
      }).catch((err) => console.log(err));

      return 1;
    } catch (error) {
      return { error };
    }
  }
}

export default EmailService;
