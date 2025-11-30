import HttpResponse from "../utils/HttpResponse.js";
import OrderService from "../services/order.service.js";
class OrderController {
  getAllCartItems = async (req, res, next) => {
    let user_id = req.user;
    let data = await new OrderService().GetCart({ user_id });

    if (data.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };

  postAddToCart = async (req, res, next) => {
    let user = req.user;
    let { book_ID } = JSON.parse(req.body);
    let data = await new OrderService().AddToCart({ user, book_ID });

    if (data.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };

  deleteItemInCart = async (req, res, next) => {
    let { user_ID, book_ID } = JSON.parse(req.body);
    let data = await new OrderService().DeleteItemInCart({ user_ID, book_ID });

    if (data.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };

  postPurchesItems = async (req, res, next) => {
    let user = req.user;
    let { listCartItemsChecked } = JSON.parse(req.body);
    let data = await new OrderService().PurchesItems({
      user,
      listCartItemsChecked,
    });

    if (data.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };
  postPayment = async (req, res, next) => {
    let user = req.user;
    let { orderDetail_ID, provider, status } = JSON.parse(req.body);
    let data = await new OrderService().Payment({
      user,
      orderDetail_ID,
      provider,
      status,
    });

    if (data.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };
  getOrderHistory = async (req, res, next) => {
    let user = req.user;
    let { pageNum } = req.params;
    pageNum = parseInt(pageNum);
    let data = await new OrderService().OrderHistory({ user, pageNum });

    if (data.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };
}

export default OrderController;
