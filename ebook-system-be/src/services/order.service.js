import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";

import { where } from "sequelize";
import ShoppingSession from "../models/ShoppingSession.js";
import CartItem from "../models/CartItem.js";
import Book from "../models/Book.js";
import OrderDetail from "../models/OrderDetail.js";
import OrderItem from "../models/OrderItem.js";
import PaymentDetail from "../models/PaymentDetail.js";

import sequelize from "../database/init.mysqldb.js";

class OrderService {
  async GetCart({ user_id }) {
    try {
      const session = await ShoppingSession.findOne({
        where: { user_ID: user_id },
      });

      if (!session) {
        return { error: "No shopping session found for this user." };
      }

      const cartItems = await CartItem.findAll({
        where: { session_ID: session.id },
        include: [
          {
            model: Book,
            as: "book",
            attributes: ["id", "title", "description", "price"],
          },
        ],
        attributes: ["id", "checked", "created_at"],
        order: [["created_at", "DESC"]],
      });

      const items = cartItems.map((item) => ({
        id: item.id,
        checked: item.checked,
        book: item.book ? item.book : null,
        addedOn: item.created_at,
      }));

      return items;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return { error: error.message };
    }
  }

  async AddToCart({ user, book_ID }) {
    try {
      let session = await ShoppingSession.findOne({
        where: {
          user_ID: user,
        },
      });
      await CartItem.create({ session_ID: session.id, book_ID });
      let { price } = await Book.findOne({ where: { id: book_ID } });
      let total = session.total + price;
      ShoppingSession.update(
        { total },
        {
          where: {
            id: session.id,
          },
        }
      );
      let allCartItems = await CartItem.findAll();
      return { total, allCartItems };
    } catch (error) {
      // throw "Email hoặc password không chính xác"
      throw error;
    }
  }

  async DeleteItemInCart({ user_ID, book_ID }) {
    const t = await sequelize.transaction();

    try {
      let session = await ShoppingSession.findOne(
        {
          where: { user_ID },
        },
        { transaction: t }
      );

      if (!session) return { error: "Shopping session not found" };

      let cartItem = await CartItem.findOne(
        {
          where: {
            session_ID: session.id,
            book_ID,
          },
        },
        { transaction: t }
      );

      if (!cartItem) return { error: "Cart item not found" };

      let { price } = await Book.findOne(
        { where: { id: book_ID } },
        { transaction: t }
      );
      let newTotal = session.total - price;

      await ShoppingSession.update(
        { total: newTotal },
        {
          where: { id: session.id },
        },
        { transaction: t }
      );

      await CartItem.destroy(
        {
          where: {
            session_ID: session.id,
            book_ID,
          },
        },
        { transaction: t }
      );

      await t.commit();

      let allCartItems = await CartItem.findAll({
        where: { session_ID: session.id },
      });

      return { total: newTotal, allCartItems };
    } catch (error) {
      await t.rollback();
      return { error };
    }
  }

  async PurchesItems({ user, listCartItemsChecked }) {
    try {
      let { id } = await OrderDetail.create({ user_ID: user, total: 0 });

      for (let i = 0; i < listCartItemsChecked.length; i++) {
        let cartItem = await CartItem.findOne({
          where: { id: listCartItemsChecked[i] },
          include: [
            {
              model: Book,
              as: "book",
              required: true,
            },
          ],
        });

        console.log(cartItem);
        if (!cartItem || !cartItem.book) {
          continue;
        }

        let book = cartItem.book;
        let orderDetail = await OrderDetail.findOne({
          where: { id },
        });

        if (!orderDetail) {
          continue;
        }

        let total = orderDetail.total;
        await OrderItem.create({
          order_ID: id,
          book_ID: book.id,
        });

        await OrderDetail.update(
          { total: total + book.price },
          { where: { id } }
        );
      }

      let orderDetailFinal = await OrderDetail.findOne({ where: { id } });
      let total = orderDetailFinal ? orderDetailFinal.total : 0;

      return { orderDetail_ID: id, total, listCartItemsChecked };
    } catch (error) {
      console.error("Error processing purchase items:", error);
      throw new Error("Purchase process failed"); // Provide a more user-friendly error message
    }
  }

  async Payment({ user, orderDetail_ID, provider, status }) {
    try {
      let { total } = await OrderDetail.findOne({
        where: { id: orderDetail_ID },
      });
      let paymentDetail = await PaymentDetail.create({
        order_ID: orderDetail_ID,
        amount: total,
        provider,
        status,
      });
      await OrderDetail.update(
        { payment_ID: paymentDetail.id },
        { where: { id: orderDetail_ID } }
      );
      return { paymentDetail };
    } catch (error) {
      // throw "Email hoặc password không chính xác"
      throw error;
    }
  }
  async OrderHistory({ user, pageNum }) {
    try {
      let limit = 20;
      let offset = 0 + (pageNum - 1) * limit;
      let listOrderHistory = await OrderDetail.findAndCountAll({
        offset: offset,
        limit: limit,
        order: [["created_at", "ASC"]],
        include: {
          required: true,
          model: PaymentDetail,
        },
      });
      console.log(listOrderHistory);
      // for(let i = 0; i < listOrderHistory.length; i++) {
      //     let listOrderItems = await OrderItem.findAll({
      //         where: {order_ID: listOrderHistory[i].id}
      //     })
      //     listOrderHistory[i] = {
      //         payment_detail: listOrderHistory[i],
      //         list_oder_items: listOrderItems
      //     }
      // }

      return { listOrderHistory };
    } catch (error) {
      // throw "Email hoặc password không chính xác"
      throw error;
    }
  }
}

export default OrderService;
