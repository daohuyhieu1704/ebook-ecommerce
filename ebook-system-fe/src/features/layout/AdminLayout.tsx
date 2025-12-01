import { useEffect, useMemo } from "react";
import {
  AppstoreOutlined,
  DashboardOutlined,
  DollarCircleFilled,
  LogoutOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Badge, Collapse, Divider, Layout, Menu, Modal } from "antd";
import { Link, Routes, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { MANAGEMENT_MENU, PATH, ROLE } from "../../constants/common";
import { useLogout } from "../../hooks/useLogout";
import { theme } from "../../theme/theme";
import type { MenuProps } from "antd";
import {
  // CliToSerLogin,
  selectIsLoggedIn,
  selectPermissions,
  selectRole,
  selectUserInfo,
  selectSystemRoles,
} from "../Login/LoginSlice";
import {
  CustomContent,
  CustomMenuItem,
  CustomSider,
  ImageContent,
  LayoutWrapper,
  LogoPara,
  LogoText,
  LogoWrapper,
  UserInfo,
} from "./Layout.style";
import { LayoutHeader } from "./LayoutHeader";
import {
  changeSelectedKey,
  selectCollapsed,
  selectSelectedKey,
  setIsRefetch,
  setSelectedRows,
} from "./layoutSlice";

import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import colors from "../../theme/colors";

const { confirm } = Modal;

const ignoreAppLayout = [PATH.LOGIN];
export const AdminLayout = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const logout: any = useLogout();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const collapsed = useAppSelector(selectCollapsed);
  const selectedKey = useAppSelector(selectSelectedKey);
  const userInfo = useAppSelector(selectUserInfo);
  const activePermissions = useAppSelector(selectPermissions);
  const systemRoles = useAppSelector(selectSystemRoles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (location) {
      dispatch(changeSelectedKey(location.pathname));
    }
  }, [location]);

  const currentRoleName = useMemo(() => {
    console.log(userInfo.role_id, systemRoles);
    if (!userInfo.role_id || systemRoles.length === 0) {
      return "Khách hàng";
    }
    const foundRole = systemRoles.find((r) => r.id === userInfo.role_id);
    return foundRole ? foundRole.name : "Admin";
  }, [userInfo.role_id, systemRoles]);

  function getKeyByValue(object: any, value: number | undefined): string {
    const str = Object.keys(object).find((key) => object[key] === value);
    return str ? str : "";
  }

  const logoutHandler = () => {
    confirm({
      title: "Xác nhận",
      content: "Bạn chắc chắn muốn đăng xuất tài khoản?",
      onOk: () => {
        logout();
      },
    });
  };
  type MenuItem = Required<MenuProps>["items"][any];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const listRouter = useMemo(
    () => [
      ...MANAGEMENT_MENU.filter((item: any) => {
        if (!item.path || item.path.length === 0) {
          return true;
        }
        const hasRequiredPermission = activePermissions.some((slug: string) => {
          let impliedPath = "";
          const parts = slug.split(".");

          if (parts.length > 1) {
            const actionPart = parts[1];
            if (actionPart.includes("_")) {
              const suffix = actionPart.split("_").pop();
              impliedPath = `/${suffix}`;
            } else {
              impliedPath = `/${actionPart}`;
            }
          } else {
            impliedPath = `/${parts[0]}`;
          }
          return item.path === impliedPath;
        });

        return hasRequiredPermission;
      }).map((item) => {
        if (!item.children) {
          return getItem(
            <>
              <Link to={item.path}></Link>
              <Link to={item.path}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "98%",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {`${item.name}`}
                </div>
              </Link>
            </>,
            item.path,
            item.icon
          );
        } else {
          return getItem(item.name, item.name, item.icon);
        }
      }),
    ],
    [userInfo.role_id]
  );

  return `${ignoreAppLayout}`.includes(location.pathname) ? (
    <LayoutWrapper>{children}</LayoutWrapper>
  ) : (
    <LayoutWrapper>
      <Layout hasSider>
        <CustomSider
          collapsed={collapsed}
          width={theme.sideBarWidth}
          style={
            !isLoggedIn
              ? { display: "none" }
              : {
                  overflow: "auto",
                  height: "100vh",
                  position: "fixed",
                  left: 0,
                  top: 0,
                  bottom: 0,
                }
          }
        >
          {collapsed ? (
            <ImageContent>
              <img src="/ptit.png" alt="logo" />
            </ImageContent>
          ) : (
            <LogoWrapper>
              <img src="/ptit.png" alt="logo" />
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LogoText>EBook</LogoText>
                <LogoPara>{currentRoleName}</LogoPara>
              </div>
            </LogoWrapper>
          )}
          <Menu
            //theme='dark'
            mode="inline"
            defaultSelectedKeys={[selectedKey]}
            selectedKeys={[selectedKey]}
            onSelect={({ key }) => {
              dispatch(setSelectedRows([]));
              key !== "logout" && dispatch(changeSelectedKey(key));
            }}
            defaultOpenKeys={["userpage", "adminpage"]}
            items={listRouter}
            style={{}}
          />
        </CustomSider>
        <Layout
          className="site-layout"
          style={{
            marginLeft: `${collapsed ? 80 : 220}px`,
            transitionDuration: "0.25s",
          }}
        >
          <LayoutHeader />
          <CustomContent>{children}</CustomContent>
        </Layout>
      </Layout>
    </LayoutWrapper>
  );
};
