import express from "express";
import authenRouter from "./authen/index.js";
import userRouter from "./user/index.js";
import bookRouter from "./book/index.js";
import orderRouter from "./order/index.js";
import emailRouter from "./email/index.js";
import feedbackRouter from "./feedback/index.js";
const router = express.Router();

router.use("/v1/api/authen", authenRouter);
router.use("/v1/api/email", emailRouter);
router.use("/v1/api/user", userRouter);
router.use("/v1/api/book", bookRouter);
router.use("/v1/api/order", orderRouter);
router.use("/v1/api/feedback", feedbackRouter);
export default router;
