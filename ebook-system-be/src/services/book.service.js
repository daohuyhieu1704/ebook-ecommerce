import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";
import Book from "../models/Book.js";
import Token from "../models/Token.js";
import { where } from "sequelize";
import Category from "../models/Category.js";
import Author from "../models/Author.js";
import Inventory from "../models/Inventory.js";
import ShoppingSession from "../models/ShoppingSession.js";
import CartItem from "../models/CartItem.js";
import OrderDetail from "../models/OrderDetail.js";
import OrderItem from "../models/OrderItem.js";
import PaymentDetail from "../models/PaymentDetail.js";

class BookService {
  async GetBooksByOrderId({ order_ID }) {
    try {
      const orderItems = await OrderItem.findAll({
        where: { order_ID },
        attributes: ["book_ID"],
      });

      const bookIds = orderItems.map((item) => item.book_ID);

      const books = await Promise.all(
        bookIds.map((bookId) =>
          Book.findOne({
            where: { id: bookId },
          })
        )
      );

      return books.filter((book) => book !== null);
    } catch (error) {
      return { error };
    }
  }
  async TopTrendingBooks() {
    try {
      let query = await OrderItem.findAll({
        include: [
          {
            required: true,
            model: Book,
          },
        ],
      });
      let books = query.map((book) => book.dataValues);
      return books;
    } catch (error) {
      return { error };
    }
  }

  // CRUD administration
  async CreateBook({ book }) {
    try {
      let {
        title,
        description,
        image,
        price,
        author_ID,
        category_ID,
        inventory_ID,
      } = book;
      let my_book = await Book.create({
        title,
        description,
        image,
        price,
        author_ID,
        category_ID,
        inventory_ID,
      });

      return { ...my_book.dataValues };
    } catch (error) {
      return { error };
    }
  }

  async GetAllBooks() {
    try {
      let query = await Book.findAll({
        include: [
          {
            required: true,
            model: Author,
          },
          {
            required: true,
            model: Category,
          }
        ],
      });
      let books = query.map((book) => book.dataValues);
      return books;
    } catch (error) {
      return { error };
    }
  }

  async GetBookByID({ id }) {
    try {
      let book = await Book.findOne({
        where: { id },
        include: [
          {
            required: true,
            model: Author,
          },
          {
            required: true,
            model: Category,
          },
          {
            required: true,
            model: Inventory,
          },
        ],
      });

      return { ...book.dataValues };
    } catch (error) {
      return { error };
    }
  }

  async GetCartItems({ user }) {
    try {
      let session = await ShoppingSession.findOne({
        where: {
          user_ID: user,
        },
      });
      let total = session.total;
      let allCartItems = await CartItem.findAll({
        order: [["created_at", "ASC"]],
        include: {
          required: true,
          model: Book,
        },
      });
      return { total, allCartItems };
    } catch (error) {
      // throw "Email hoặc password không chính xác"
      throw error;
    }
  }

  async UpdateBook({ id, book }) {
    try {
      await Book.update(
        { ...book, modified_at: Date.now() },
        {
          where: { id },
        }
      );

      return { id, ...book, modified_at: Date.now() };
    } catch (error) {
      return { error };
    }
  }

  async DeleteBook({ id }) {
    try {
      let book = await Book.findOne({ where: { id } });
      await Book.destroy({
        where: { id },
      });
      return { ...book };
    } catch (error) {
      return { error };
    }
  }

  //CATEG
  async AddCategory({ category }) {
    try {
      let { name, description } = category;
      let my_category = await Category.create({
        name,
        description,
      });
      let query = await Category.findAll();
      return query;
    } catch (error) {
      return { error };
    }
  }

  async GetAllCategory() {
    try {
      let query = await Category.findAll();
      let category = query.map((category) => category.dataValues);
      return category;
    } catch (error) {
      return { error };
    }
  }

  // async GetBookByID({ id }) {
  //   try {
  //     let book = await Book.findOne({
  //       where: { id },
  //       include: [
  //         {
  //           required: true,
  //           model: Author,
  //         },
  //         {
  //           required: true,
  //           model: Category,
  //         },
  //         {
  //           required: true,
  //           model: Inventory,
  //         },
  //       ],
  //     });

  //     return { ...book.dataValues };
  //   } catch (error) {
  //     return { error };
  //   }
  // }

  async UpdateCategory({ id, category }) {
    try {
      await Category.update(
        { ...category },
        {
          where: { id },
        }
      );
      let query = await Category.findAll();
      return query;
    } catch (error) {
      return { error };
    }
  }

  async DeleteCategory({ id }) {
    try {
      let category = await Category.findOne({ where: { id } });
      await Category.destroy({
        where: { id },
      });
      let query = await Category.findAll();

      return query;
    } catch (error) {
      return { error };
    }
  }

  //author
  async AddAuthor({ author }) {
    try {
      let { name, description } = author;
      let my_author = await Author.create({
        name,
        description,
      });
      let query = await Author.findAll();

      return query;
    } catch (error) {
      return { error };
    }
  }

  async GetAllAuthor() {
    try {
      let query = await Author.findAll();
      let author = query.map((author) => author.dataValues);
      return author;
    } catch (error) {
      return { error };
    }
  }

  async UpdateAuthor({ id, author }) {
    try {
      await Author.update(
        { ...author },
        {
          where: { id },
        }
      );
      let query = await Author.findAll();

      return query;
    } catch (error) {
      return { error };
    }
  }

  async DeleteAuthor({ id }) {
    try {
      let author = await Author.findOne({ where: { id } });
      await Author.destroy({
        where: { id },
      });
      let query = await Author.findAll();

      return query;
    } catch (error) {
      return { error };
    }
  }
}

export default BookService;
