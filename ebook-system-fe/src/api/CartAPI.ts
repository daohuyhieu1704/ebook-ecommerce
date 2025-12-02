import { ROLE } from "../constants/common";
import axiosClient from "../helper/axios/axiosClient";

export const CartAPI = {
  addToCart: (token: string, book_ID: string) => {
    const url = `${process.env.REACT_APP_ENDPOINT}v1/api/order/shop/add-to-cart`;

    return axiosClient.post(
      url,
      { book_ID },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  },
  getCart: (token: string) => {
    const url = `${process.env.REACT_APP_ENDPOINT}v1/api/order/shop/cart-items`;
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
};
