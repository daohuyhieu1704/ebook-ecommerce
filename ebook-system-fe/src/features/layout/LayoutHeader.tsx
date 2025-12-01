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
    <Menu style={{ padding: "0" }}>
      <CustomMenuItemDropdown
        onClick={() => navigate(PATH.PROFILE)}
        key="1"
        icon={<UserOutlined />}
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

  return (
    <CustomHeader style={!isLoggedIn ? { display: "none" } : {}}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          onClick: toggle,
        })}
        {canCreate ? (
          <ActionWrapper>
            <ActionItem onClick={drawerOnOpenCreate}>
              <PlusOutlined style={{ color: "green" }} />
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
        <Dropdown overlay={menuNoti} trigger={["click"]}>
          <Button shape="circle" type="link">
            <BellOutlined />
          </Button>
        </Dropdown>
        <Text code style={{ color: theme.colors.primary }}>
          {userInfo?.name}
        </Text>
        <HeaderConfirm>
          <Dropdown overlay={menu} trigger={["click"]}>
            <UserInfo>
              <Avatar
                size="default"
                icon={<UserOutlined />}
                style={{ color: theme.colors.primary }}
              />
            </UserInfo>
          </Dropdown>
        </HeaderConfirm>
      </div>
      <Drawer
        title={forms[formTitle]?.formTitle}
        width={500}
        maskClosable={false}
        placement="right"
        onClose={drawerRightOnClose}
        visible={drawerRightVisible}
        footer={[
          <DrawerFooterButton
            disabled={disableSubmit}
            type="primary"
            form={forms[formTitle]?.formName}
            key="submit"
            htmlType="submit"
            size="large"
            loading={isLoadingSubmit}
          >
            {"Xác nhận"}
          </DrawerFooterButton>,
          <DrawerFooterButton
            key="back"
            onClick={drawerRightOnClose}
            size="large"
          >
            Hủy bỏ
          </DrawerFooterButton>,
        ]}
        headerStyle={{
          background: theme.colors.primary,
          color: "white",
          borderRadius: 0,
        }}
        footerStyle={{
          height: "70px",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {forms[formTitle]?.formRender}
      </Drawer>
      <Drawer
        title={details[location?.pathname]?.detailTitle}
        height={"100vh"}
        placement="bottom"
        onClose={drawerBottomOnClose}
        visible={drawerBottomVisible}
        footer={[
          <Button key="back" onClick={drawerBottomOnClose} size="large">
            Hủy bỏ
          </Button>,
        ]}
        headerStyle={{
          background: theme.colors.primary,
          color: "white",
          borderRadius: 0,
        }}
        footerStyle={{
          height: "70px",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        {details[location?.pathname]?.cpnRender}
      </Drawer>
    </CustomHeader>
  );
};
