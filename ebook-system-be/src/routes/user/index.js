import express from "express";
import UserController from "../../controllers/user.controller.js";
import { jwtMiddleware } from "../../configs/jwt.middleware.js";
import { adminMiddleware } from "../../configs/admin.middleware.js";

const router = express.Router();

// User's functions
router.post("/verify", new UserController().checkLoginEmailToken);
router.post("/shop/sign-up", new UserController().postSignUp);
router.post("/shop/new-user", new UserController().newUser);
router.patch(
  "/shop/update-info",
  jwtMiddleware,
  new UserController().patchUpdateInfo
);

// Admin's functions - CRUD
router.post(
  "/admin/create-account",
  adminMiddleware,
  new UserController().postAccount
);
router.get(
  "/admin/getall-account",
  adminMiddleware,
  new UserController().getAllAccounts
);
router.get(
  "/admin/get-account",
  adminMiddleware,
  new UserController().getAccount
);
router.patch(
  "/admin/update-account",
  adminMiddleware,
  new UserController().patchUpdateAccount
);
router.delete(
  "/admin/delete-account",
  adminMiddleware,
  new UserController().deleteAccount
);

export default router;
