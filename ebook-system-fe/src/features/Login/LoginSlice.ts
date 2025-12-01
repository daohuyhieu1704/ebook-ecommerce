import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { LOCAL_STORAGE_ITEM } from "../../constants/common";

export interface RoleType {
  id: string;
  name: string;
  description?: string;
}

export interface UserInfo {
  id?: string;
  name?: string;
  email?: string;
  role_id?: string;
  phone_number?: string;
  start_url?: string;
}

export interface LoginResponsePayload {
  user: UserInfo;
  current_role?: RoleType;
  systemRoles: RoleType[];
  permissions: string[];
  accessToken: string;
  refreshToken: string;
  remember?: boolean;
}

export interface LoginState {
  isLoggedIn: boolean;
  userInfo: UserInfo;
  role: string;
  permissions: string[];
  accessToken: string;
  systemRoles: RoleType[];
  isLoggedOut: boolean;
}

const initialState: LoginState = {
  isLoggedIn:
    !!localStorage.getItem(LOCAL_STORAGE_ITEM.ACCESS_TOKEN) ||
    !!sessionStorage.getItem(LOCAL_STORAGE_ITEM.ACCESS_TOKEN),

  userInfo:
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEM.USER_INFO) || "{}") ||
    JSON.parse(sessionStorage.getItem(LOCAL_STORAGE_ITEM.USER_INFO) || "{}") ||
    {},
  role:
    localStorage.getItem(LOCAL_STORAGE_ITEM.ROLE) ||
    sessionStorage.getItem(LOCAL_STORAGE_ITEM.ROLE) ||
    "",
  accessToken:
    localStorage.getItem(LOCAL_STORAGE_ITEM.ACCESS_TOKEN) ||
    sessionStorage.getItem(LOCAL_STORAGE_ITEM.ACCESS_TOKEN) ||
    "",
  permissions:
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEM.PERMISSIONS) || "[]") ||
    JSON.parse(
      sessionStorage.getItem(LOCAL_STORAGE_ITEM.PERMISSIONS) || "[]"
    ) ||
    [],

  systemRoles:
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEM.SYSROLES) || "[]") ||
    JSON.parse(sessionStorage.getItem(LOCAL_STORAGE_ITEM.SYSROLES) || "[]") ||
    [],

  isLoggedOut: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginResponsePayload>) => {
      const {
        user,
        systemRoles,
        permissions,
        accessToken,
        refreshToken,
        remember,
      } = action.payload;

      state.isLoggedIn = true;
      state.userInfo = user;
      state.role = user.role_id || "";
      state.permissions = permissions;
      state.accessToken = accessToken;
      state.systemRoles = systemRoles;

      const storage = remember ? localStorage : sessionStorage;

      storage.setItem(LOCAL_STORAGE_ITEM.USER_INFO, JSON.stringify(user));
      storage.setItem(LOCAL_STORAGE_ITEM.ROLE, user.role_id || "");
      storage.setItem(LOCAL_STORAGE_ITEM.ACCESS_TOKEN, accessToken);
      storage.setItem(LOCAL_STORAGE_ITEM.REFRESH_TOKEN, refreshToken);
      storage.setItem(
        LOCAL_STORAGE_ITEM.PERMISSIONS,
        JSON.stringify(permissions)
      );
      storage.setItem(LOCAL_STORAGE_ITEM.SYSROLES, JSON.stringify(systemRoles));
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = {};
      state.role = "";
      state.permissions = [];
      state.accessToken = "";
      state.systemRoles = [];

      localStorage.removeItem(LOCAL_STORAGE_ITEM.USER_INFO);
      localStorage.removeItem(LOCAL_STORAGE_ITEM.ACCESS_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_ITEM.REFRESH_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_ITEM.ROLE);
      localStorage.removeItem(LOCAL_STORAGE_ITEM.PERMISSIONS);
      localStorage.removeItem(LOCAL_STORAGE_ITEM.SYSROLES);

      sessionStorage.removeItem(LOCAL_STORAGE_ITEM.USER_INFO);
      sessionStorage.removeItem(LOCAL_STORAGE_ITEM.ACCESS_TOKEN);
      sessionStorage.removeItem(LOCAL_STORAGE_ITEM.REFRESH_TOKEN);
      sessionStorage.removeItem(LOCAL_STORAGE_ITEM.ROLE);
      sessionStorage.removeItem(LOCAL_STORAGE_ITEM.PERMISSIONS);
      sessionStorage.removeItem(LOCAL_STORAGE_ITEM.SYSROLES);
    },

    setUserInfo_safe: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },

    setIsLoggedOut: (state, action) => {
      state.isLoggedOut = action.payload;
    },
  },
});

export const { loginSuccess, setUserInfo_safe, logout, setIsLoggedOut } =
  loginSlice.actions;

export const selectUserInfo = (state: RootState) => state.login.userInfo;
export const selectRole = (state: RootState) => state.login.role;
export const selectPermissions = (state: RootState) => state.login.permissions;
export const selectSystemRoles = (state: RootState) => state.login.systemRoles;
export const selectIsLoggedIn = (state: RootState) => state.login.isLoggedIn;
export const selectIsLoggedOut = (state: RootState) => state.login.isLoggedOut;
export const selectAccessToken = (state: RootState) => state.login.accessToken;

export default loginSlice.reducer;
