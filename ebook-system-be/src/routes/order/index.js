import express from "express";
import OrderController from "../../controllers/order.controller.js";
import { jwtMiddleware } from "../../configs/jwt.middleware.js";
import { adminMiddleware } from "../../configs/admin.middleware.js";

const router = express.Router();

// Book's functions
router.get(
  "/shop/cart-items",
  jwtMiddleware,
  new OrderController().getAllCartItems
);
router.post(
  "/shop/add-to-cart",
  jwtMiddleware,
  new OrderController().postAddToCart
);
router.delete(
  "/shop/delete-item-in-cart",
  jwtMiddleware,
  new OrderController().deleteItemInCart
);
router.post(
  "/shop/purches-items",
  jwtMiddleware,
  new OrderController().postPurchesItems
);
// router.get("/shop/find-voucher-by-code/:code", jwtMiddleware, new OrderController().getFindVoucherByCode);
router.post("/shop/payment", jwtMiddleware, new OrderController().postPayment);
router.get(
  "/shop/order-history/:pageNum",
  jwtMiddleware,
  new OrderController().getOrderHistory
);

export default router;
