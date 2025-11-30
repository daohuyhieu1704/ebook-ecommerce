import HttpResponse from "../utils/HttpResponse.js";
import BookService from "../services/book.service.js";
import OrderService from "../services/order.service.js";
class BookController {
  //BOOK CONTROLLERS
  getBooksPurchasedByUser = async (req, res, next) => {
    let user_ID = req.user;
    let pageNum = 1;
    let data = await new OrderService().OrderHistory({
      user_ID,
      pageNum,
    });

    if (data?.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }

    data = data?.listOrderHistory.rows?.map(
      (item) => item.PaymentDetail.order_ID
    );

    let books = [];
    for (let i = 0; i < data.length; i++) {
      let bookArr = await new BookService().GetBooksByOrderId({
        order_ID: data[i],
      });
      if (bookArr?.error) {
        return res.status(400).json(HttpResponse.error(bookArr.error));
      }
      books.push(...bookArr);
    }

    return res.json(HttpResponse.success(books));
  };

  getTopTrendingBooks = async (req, res, next) => {
    const { pageNum } = JSON.parse(req.body);
    let data = await new BookService().TopTrendingBooks(pageNum);

    if (data?.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };

  //CRUD ADMIN
  postBook = async (req, res, next) => {
    const book = JSON.parse(req.body);
    let data = await new BookService().CreateBook({ book });
    if (data.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };

  getAllBooks = async (req, res, next) => {
    let data = await new BookService().GetAllBooks();

    if (data?.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };
  getCartItems = async (req, res, next) => {
    let user = req.user;
    let data = await new BookService().GetCartItems({ user });

    if (data?.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };
  getBook = async (req, res, next) => {
    let { id } = req.params;
    let data = await new BookService().GetBookByID({ id });

    if (data?.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };

  patchUpdateBook = async (req, res, next) => {
    let { id } = req.params;
    const book = JSON.parse(req.body);
    let data = await new BookService().UpdateBook({ id, book });

    if (data?.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };

  deleteBook = async (req, res, next) => {
    let { id } = req.params;
    let data = await new BookService().DeleteBook({ id });

    if (data?.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };
  // categories
  getAllCategory = async (req, res, next) => {
    let data = await new BookService().GetAllCategory();

    if (data?.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };
  postAddCategory = async (req, res, next) => {
    const category = JSON.parse(req.body);
    let data = await new BookService().AddCategory({ category });
    if (data.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };

  patchUpdateCategory = async (req, res, next) => {
    let { id } = req.params;
    const category = JSON.parse(req.body);
    let data = await new BookService().UpdateCategory({ id, category });

    if (data?.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };

  deleteCategory = async (req, res, next) => {
    let { id } = req.params;
    let data = await new BookService().DeleteCategory({ id });

    if (data?.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };
  //author
  getAllAuthor = async (req, res, next) => {
    let data = await new BookService().GetAllAuthor();

    if (data?.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };
  postAddAuthor = async (req, res, next) => {
    const author = JSON.parse(req.body);
    let data = await new BookService().AddAuthor({ author });
    if (data.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };

  patchUpdateAuthor = async (req, res, next) => {
    let { id } = req.params;
    const author = JSON.parse(req.body);
    let data = await new BookService().UpdateAuthor({ id, author });

    if (data?.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };

  deleteAuthor = async (req, res, next) => {
    let { id } = req.params;
    let data = await new BookService().DeleteAuthor({ id });

    if (data?.error) {
      return res.status(400).json(HttpResponse.error(data.error));
    }
    return res.json(HttpResponse.success(data));
  };
}

export default BookController;
