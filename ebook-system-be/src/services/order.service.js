import ShoppingSession from "../models/ShoppingSession.js";
import CartItem from "../models/CartItem.js";
import Book from "../models/Book.js";
import Author from "../models/Author.js";
import Category from "../models/Category.js";
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
        return {
          session: null,
          items: [],
        };
      }

      const cartItems = await CartItem.findAll({
        where: { session_ID: session.id },
        include: [
          {
            model: Book,
            as: "book",
            attributes: [
              "id",
              "title",
              "description",
              "price",
              "image",
              "pdf_url",
            ],
            include: [
              {
                model: Author,
                as: "Author",
                attributes: ["name"],
              },
              {
                model: Category,
                as: "Category",
                attributes: ["name"],
              },
            ],
          },
        ],
        attributes: ["id", "checked", "created_at"],
        order: [["created_at", "DESC"]],
      });

      return {
        session: session,
        items: cartItems,
      };
    } catch (error) {
      console.error("Error fetching cart items:", error);
      throw error;
    }
  }

  async AddToCart({ user, book_ID }) {
    try {
      let session = await ShoppingSession.findOne({ where: { user_ID: user } });
      if (!session) {
        session = await ShoppingSession.create({ user_ID: user, total: 0 });
      }

      const bookData = await Book.findOne({ where: { id: book_ID } });
      if (!bookData) {
        throw new Error("Sách không tồn tại.");
      }

      let cartItem = await CartItem.findOne({
        where: { session_ID: session.id, book_ID: book_ID },
      });

      if (cartItem) {
        throw new Error(
          `Sách "${bookData.title}" là sản phẩm số, bạn chỉ được mua tối đa 1 bản.`
        );
      }

      if (!cartItem) {
        cartItem = await CartItem.create({
          session_ID: session.id,
          book_ID,
          quantity: 1,
          checked: true,
        });
      }

      let total = session.total + bookData.price;
      await ShoppingSession.update({ total }, { where: { id: session.id } });

      let allCartItems = await CartItem.findAll({
        where: { session_ID: session.id },
        include: ["book"],
      });

      return { total, allCartItems };
    } catch (error) {
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
