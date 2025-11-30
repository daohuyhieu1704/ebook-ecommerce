import { Json } from "sequelize/lib/utils";
import HttpResponse from "../utils/HttpResponse.js";
import FeedbackService from "../services/feedback.service.js";
import BodyParser from "body-parser";

class FeedbackController {
  getAllFeedbacks = async (req, res, next) => {
    let book_id = req.params.book_id;
    let data = await new FeedbackService().GetFeedbacks({ book_id });

    if (data.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };
  getFeedback = async (req, res, next) => {
    let user_ID = req.user;
    let book_ID = req.params.book_id;
    let data = await new FeedbackService().GetFeedback({ user_ID, book_ID });

    if (data.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };
  createFeedback = async (req, res, next) => {
    let feedbackData = JSON.parse(req.body);
    feedbackData.user_ID = req.user;

    let data = await new FeedbackService().createFeedback(feedbackData);

    if (data.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
    return null;
  };
  updateFeedback = async (req, res, next) => {
    let feedbackData = JSON.parse(req.body);
    let data = await new FeedbackService().updateFeedback(feedbackData);

    if (data.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };
}

export default FeedbackController;
