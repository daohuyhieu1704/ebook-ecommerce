import express from "express";
import { jwtMiddleware } from "../../configs/jwt.middleware.js";
import FeedbackController from "../../controllers/feedback.controller.js";

const router = express.Router();

router.get(
  "/getAll/:book_id",
  jwtMiddleware,
  new FeedbackController().getAllFeedbacks
);
router.get(
  "/getById/:book_id",
  jwtMiddleware,
  new FeedbackController().getFeedback
);
router.post("/create", jwtMiddleware, new FeedbackController().createFeedback);
router.put("/update", jwtMiddleware, new FeedbackController().updateFeedback);

export default router;
