import express from "express";
import BookController from "../../controllers/book.controller.js";
import { jwtMiddleware } from "../../configs/jwt.middleware.js";
import { adminMiddleware } from "../../configs/admin.middleware.js";

const router = express.Router();

// Book's functions
router.get(
  "/shop/top-trending-books",
  jwtMiddleware,
  new BookController().getTopTrendingBooks
);
router.get(
  "/shop/getall-books",
  jwtMiddleware,
  new BookController().getAllBooks
);
router.get(
  "/shop/library-books",
  jwtMiddleware,
  new BookController().getBooksPurchasedByUser
);
router.get("/shop/get-book/:id", jwtMiddleware, new BookController().getBook);
router.patch(
  "/shop/update-book/:id",
  jwtMiddleware,
  new BookController().patchUpdateBook
);
router.delete(
  "/shop/delete-book",
  jwtMiddleware,
  new BookController().deleteBook
);

// Admin's functions - CRUD
router.post(
  "/admin/create-book",
  adminMiddleware,
  new BookController().postBook
);
router.get(
  "/admin/getall-books",
  adminMiddleware,
  new BookController().getAllBooks
);
router.get(
  "/admin/cart-items",
  adminMiddleware,
  new BookController().getCartItems
);
router.get(
  "/admin/get-book/:id",
  adminMiddleware,
  new BookController().getBook
);
router.patch(
  "/admin/update-book/:id",
  adminMiddleware,
  new BookController().patchUpdateBook
);
router.delete(
  "/admin/delete-book",
  adminMiddleware,
  new BookController().deleteBook
);

router.get(
  "/admin/getall-category",
  adminMiddleware,
  new BookController().getAllCategory
);
router.post(
  "/admin/add-category",
  adminMiddleware,
  new BookController().postAddCategory
);
router.patch(
  "/admin/update-category/:id",
  adminMiddleware,
  new BookController().patchUpdateCategory
);
router.delete(
  "/admin/delete-category/:id",
  adminMiddleware,
  new BookController().deleteCategory
);

router.get(
  "/admin/getall-author",
  adminMiddleware,
  new BookController().getAllAuthor
);
router.post(
  "/admin/add-author",
  adminMiddleware,
  new BookController().postAddAuthor
);
router.patch(
  "/admin/update-author/:id",
  adminMiddleware,
  new BookController().patchUpdateAuthor
);
router.delete(
  "/admin/delete-author/:id",
  adminMiddleware,
  new BookController().deleteAuthor
);
export default router;
