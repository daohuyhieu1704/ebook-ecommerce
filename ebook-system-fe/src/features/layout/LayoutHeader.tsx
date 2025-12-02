/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  BellOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { createElement, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { theme } from "../../theme/theme";
import {
  selectIsLoggedIn,
  selectPermissions,
  selectUserInfo,
} from "../Login/LoginSlice";
import {
  CustomHeader,
  CustomMenuItemDropdown,
  DrawerFooterButton,
  HeaderConfirm,
  UserInfo,
  ActionItem,
  ActionWrapper,
} from "./LayoutHeader.style";
import {
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Menu,
  Modal,
  Typography,
} from "antd";
import { useLogout } from "../../hooks/useLogout";
import {
  closeDrawerBottom,
  closeDrawerRight,
  selectCollapsed,
  selectDisableSubmit,
  selectDrawerBottomVisible,
  selectDrawerRightVisible,
  selectIsLoadingSubmit,
  selectIsUpdateForm,
  toggleSidebar,
  openDrawerRight,
  setIsUpdateForm,
  setSelectedRows,
} from "./layoutSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../constants/common";
import SearchFilter from "./components/SearchFilter";
import BookDetail from "../Book/BookDetail";
import EmployeeManagerForm from "../EmployeeManager/EmployeeManagerForm";
import CategoryForm from "../Category/CategoryForm";
import AuthorDetail from "../Author/AuthorDetail";
import BookForm from "../Book/BookForm";
import AuthorForm from "../Author/AuthorForm";
import CategoryDetail from "../Category/CategoryDetail/CategoryDetail";
const { confirm } = Modal;
const { Text, Title } = Typography;

interface FormsType {
  [key: string]: {
    formTitle: string;
    formRender?: JSX.Element;
    formName: string;
  };
}

interface DetailType {
  [key: string]: {
    detailTitle: string;
    cpnRender?: JSX.Element;
    cpnName: string;
  };
}

export const LayoutHeader = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const userInfo = useAppSelector(selectUserInfo);
  const logout = useLogout();
  const collapsed = useAppSelector(selectCollapsed);
  const drawerRightVisible = useAppSelector(selectDrawerRightVisible);
  const drawerBottomVisible = useAppSelector(selectDrawerBottomVisible);
  const isUpdateForm = useAppSelector(selectIsUpdateForm);
  const isLoadingSubmit = useAppSelector(selectIsLoadingSubmit);
  const disableSubmit = useAppSelector(selectDisableSubmit);
  const activePermissions = useAppSelector(selectPermissions);
  const location: any = useLocation();
  const [formTitle, setFormTitle] = useState<string>(location?.pathname);
  const moduleName = location?.pathname.split("/").filter(Boolean).pop();

  const canCreate = activePermissions.some((slug: string) => {
    const hasCreateAction = slug.includes("create");
    const matchesModule = moduleName ? slug.includes(moduleName) : false;
    return hasCreateAction && matchesModule;
  });

  const details: DetailType = {
    [PATH.BOOK]: {
      detailTitle: "Chi tiết sách",
      cpnRender: <BookDetail />,
      cpnName: "Book",
    },
    [PATH.CATEGORY_DETAIL]: {
      detailTitle: "Chi tiết sách",
      cpnRender: <CategoryDetail />,
      cpnName: "CateDetail",
    },
    [PATH.AUTHOR]: {
      detailTitle: "Chi tiết tác giả",
      cpnRender: <AuthorDetail />,
      cpnName: "Author",
    },
  };

  const forms: FormsType = {
    [PATH.EMPLOYEES]: {
      formTitle: !isUpdateForm ? "Tạo nhân viên" : "Sửa nhân viên",
      formRender: <EmployeeManagerForm formName={"Employees"} />,
      formName: "Employees",
    },
    [PATH.CATEGORY]: {
      formTitle: !isUpdateForm ? "Tạo thể loại" : "Sửa thể loại",
      formRender: <CategoryForm formName={"Category"} />,
      formName: "Category",
    },
    [PATH.AUTHOR]: {
      formTitle: !isUpdateForm ? "Tạo tác giả" : "Sửa tác giả",
      formRender: <AuthorForm formName={"Author"} />,
      formName: "Author",
    },
    [PATH.BOOK]: {
      formTitle: !isUpdateForm ? "Tạo sách" : "Sửa sách",
      formRender: <BookForm formName={"Book"} />,
      formName: "Book",
    },
  };

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  const drawerRightOnClose = () => {
    dispatch(closeDrawerRight());
  };

  const drawerBottomOnClose = () => {
    dispatch(closeDrawerBottom());
  };

  const drawerOnOpenCreate = () => {
    dispatch(setIsUpdateForm(false));
    dispatch(openDrawerRight());
    dispatch(setSelectedRows([]));
  };

  const menu = (
    <Menu
      style={{
        padding: "0",
        backgroundColor: theme.colors.secondary,
        border: `1px solid ${theme.colors.border}`,
      }}
    >
      <CustomMenuItemDropdown
        onClick={() => navigate(PATH.PROFILE)}
        key="1"
        icon={<UserOutlined />}
        style={{ color: theme.colors.textColor }}
      >
        Cá nhân
      </CustomMenuItemDropdown>
      <CustomMenuItemDropdown
        danger={true}
        onClick={() => logout()}
        key="2"
        icon={<LogoutOutlined />}
      >
        Đăng xuất
      </CustomMenuItemDropdown>
    </Menu>
  );

  const menuNoti: any = [];
  useEffect(() => {
    const loc = `${location?.pathname}`.split("/");
    if (loc.length >= 3) {
      setFormTitle(`/${loc[1]}/:id_category`);
    } else {
      setFormTitle(location?.pathname);
    }
  }, [drawerRightVisible, location?.pathname]);

  const drawerStyles = {
    headerStyle: {
      background: theme.colors.secondary,
      color: theme.colors.textColor,
      borderBottom: `1px solid ${theme.colors.border}`,
      borderRadius: 0,
    },
    bodyStyle: {
      background: theme.colors.primary,
      color: theme.colors.textColor,
    },
    footerStyle: {
      height: "70px",
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: theme.colors.secondary,
      borderTop: `1px solid ${theme.colors.border}`,
    },
  };

  return (
    <CustomHeader style={!isLoggedIn ? { display: "none" } : {}}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          onClick: toggle,
          style: { color: theme.colors.textColor, fontSize: "18px" },
        })}
        {canCreate ? (
          <ActionWrapper>
            <ActionItem onClick={drawerOnOpenCreate}>
              <PlusOutlined style={{ color: theme.colors.highlight }} />
            </ActionItem>
          </ActionWrapper>
        ) : (
          <></>
        )}
        <SearchFilter path={location?.pathname} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text code style={{ color: theme.colors.textColor }}>
          {userInfo?.name}
        </Text>
        <HeaderConfirm>
          <Dropdown overlay={menu} trigger={["click"]}>
            <UserInfo>
              <Avatar
                size="default"
                icon={<UserOutlined />}
                style={{
                  backgroundColor: theme.colors.gray,
                  color: theme.colors.textColor,
                }}
              />
            </UserInfo>
          </Dropdown>
        </HeaderConfirm>
      </div>

      <Drawer
        title={
          <span style={{ color: theme.colors.textColor }}>
            {forms[formTitle]?.formTitle}
          </span>
        }
        width={500}
        maskClosable={false}
        placement="right"
        onClose={drawerRightOnClose}
        visible={drawerRightVisible}
        headerStyle={drawerStyles.headerStyle}
        bodyStyle={drawerStyles.bodyStyle}
        footerStyle={drawerStyles.footerStyle}
        closeIcon={<span style={{ color: theme.colors.textColor }}>x</span>}
        footer={[
          <DrawerFooterButton
            disabled={disableSubmit}
            type="primary"
            form={forms[formTitle]?.formName}
            key="submit"
            htmlType="submit"
            size="large"
            loading={isLoadingSubmit}
            style={{
              backgroundColor: theme.colors.highlight,
              borderColor: theme.colors.highlight,
              color: theme.colors.white,
            }}
          >
            {"Xác nhận"}
          </DrawerFooterButton>,
          <DrawerFooterButton
            key="back"
            onClick={drawerRightOnClose}
            size="large"
            style={{
              backgroundColor: theme.colors.gray,
              color: theme.colors.textColor,
              borderColor: theme.colors.border,
            }}
          >
            Hủy bỏ
          </DrawerFooterButton>,
        ]}
      >
        {forms[formTitle]?.formRender}
      </Drawer>
      <Drawer
        title={
          <span style={{ color: theme.colors.textColor }}>
            {details[location?.pathname]?.detailTitle}
          </span>
        }
        height={"100vh"}
        placement="bottom"
        onClose={drawerBottomOnClose}
        visible={drawerBottomVisible}
        headerStyle={drawerStyles.headerStyle}
        bodyStyle={drawerStyles.bodyStyle}
        footerStyle={{
          ...drawerStyles.footerStyle,
          justifyContent: "end",
        }}
        closeIcon={<span style={{ color: theme.colors.textColor }}>x</span>}
        footer={[
          <Button
            key="back"
            onClick={drawerBottomOnClose}
            size="large"
            style={{
              backgroundColor: theme.colors.gray,
              color: theme.colors.textColor,
              borderColor: theme.colors.border,
            }}
          >
            Hủy bỏ
          </Button>,
        ]}
      >
        {details[location?.pathname]?.cpnRender}
      </Drawer>
    </CustomHeader>
  );
};
