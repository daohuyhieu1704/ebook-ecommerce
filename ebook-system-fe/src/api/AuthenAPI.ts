import axiosClient from "../helper/axios/axiosClient";
import { axiosPost } from "../helper/axios";

export const AuthenAPI = {
  Register(data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role?: string;
  }) {
    let url = `${process.env.REACT_APP_ENDPOINT}v1/api/user/sign-up`;
    console.log();
    if (data.role !== "customer") {
      url = `${process.env.REACT_APP_ENDPOINT}v1/api/user/new-user`;
    }

    return axiosPost(url, data);
  },
  LogIn(data: { email: string; password: string }) {
    const url = `${process.env.REACT_APP_ENDPOINT}v1/api/authen/shop/login`;
    return axiosPost(url, data);
  },
  RefreshToken(data: { refreshToken: string }, token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}v1/api/authen/shop/refresh-token`;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    return axiosClient.post(url, data, { headers });
  },
  PostLogout(data: { refreshToken: string }, token: string) {
    const url = `${process.env.REACT_APP_ENDPOINT}v1/api/authen/shop/logout`;
    const headers = {
      authorization: `Bearer ${token}`,
    };
    return axiosClient.post(url, data, { headers });
  },
};
