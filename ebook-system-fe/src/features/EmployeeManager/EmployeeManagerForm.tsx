import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { DatePicker, Form, Input, Select, Switch } from "antd";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";

import { UserAPI } from "../../api/UserAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import { ROLE } from "../../constants/common";
import {
  closeDrawerRight,
  selectDrawerRightVisible,
  selectIsRefetch,
  selectIsUpdateForm,
  selectSelectedKey,
  selectSelectedRows,
  setIsLoadingSubmit,
  setIsRefetch,
  setSelectedRows,
} from "../layout/layoutSlice";
import {
  selectAccessToken,
  selectSystemRoles,
  selectUserInfo,
} from "../Login/LoginSlice";
import { selectDataEmp } from "./EmployeeManagerSlice";

import { FormCustom } from "./EmployeeManager.style";
import { useLocation } from "react-router-dom";

type FormProps = {
  formName: string;
};

export default function EmployeeManagerForm(props: FormProps) {
  const { formName } = props;
  const inputRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [form] = Form.useForm();

  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const isUpdateForm = useAppSelector(selectIsUpdateForm);
  const selectedRows = useAppSelector(selectSelectedRows);
  const drawerRightVisible = useAppSelector(selectDrawerRightVisible);
  const userInfo = useAppSelector(selectUserInfo);
  const dataTable = useAppSelector(selectDataEmp);
  const accessToken = useAppSelector(selectAccessToken);
  const systemRoles = useAppSelector(selectSystemRoles);
  const selectedTab = useAppSelector(selectSelectedKey);
  const isRefetch = useAppSelector(selectIsRefetch);

  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");

  const roleOptions = systemRoles
    .filter((role: any) => role.id !== "customer")
    .map((role: any) => ({
      value: role.id,
      label: role.name,
    }));

  const onSubmitSuccess = (res: any) => {
    dispatch(setIsLoadingSubmit(false));
    NotificationCustom({
      type: "success",
      message: "Thành công",
      description: `${res.data.message}`,
    });
    form.resetFields();
    dispatch(setIsRefetch(true));
    dispatch(closeDrawerRight());
  };

  const onSubmitError = (err: any) => {
    dispatch(setIsLoadingSubmit(false));
    NotificationCustom({
      type: "error",
      message: "Error",
      description:
        err.response?.data?.message || err.message || "Có lỗi xảy ra",
    });
  };

  const onFill = (values: any) => {
    if (values?.email) {
      const currentRole =
        values.role_id ||
        values.Role?.id ||
        values.roles?.[0]?.id ||
        "employee";

      form.setFieldsValue({
        firstName: values?.first_name,
        lastName: values?.last_name,
        email: values?.email,
        phoneNumber: values?.phone_number || values?.phoneNumber,
        birthday: values?.birthday
          ? moment(values?.birthday, "YYYY-MM-DD")
          : null,
        enable: values?.enable === 1 || values?.enable === true,
        role_id: currentRole, // [NEW] Set giá trị role
      });
    }
  };
  function formatDateToYyyyMmDd(date: Date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}/${month}/${day}`;
  }

  const onFinish = async (values: any) => {
    try {
      dispatch(setIsLoadingSubmit(true));
      const fullname = `${values?.firstName} ${values?.lastName}`;

      if (isUpdateForm) {
        const res = await UserAPI.admin.updateAccount(
          {
            id: selectedRows[0]?.key || selectedRows[0]?.id,
            first_name: values?.firstName,
            last_name: values?.lastName,
            email: values?.email,
            phone_number: values?.phoneNumber,
            birthday: values?.birthday
              ? formatDateToYyyyMmDd(new Date(values?.birthday))
              : null,
            enable: values?.enable === true ? 1 : 0,
            role_id: values?.role_id,
          },
          accessToken
        );
        onSubmitSuccess(res);
      } else {
        const res1 = await UserAPI.admin.signUp(
          {
            full_name: fullname,
            email: values?.email,
            password: values?.password,
          },
          accessToken
        );

        if (res1.data.code !== 200 && res1.data.code !== 201) {
          dispatch(setIsLoadingSubmit(false));
          NotificationCustom({
            type: "error",
            message: "Error",
            description: res1.data.message,
          });
        } else {
          const userId = res1.data.data.user.id;
          const res2 = await UserAPI.admin.updateAccount(
            {
              id: userId,
              first_name: values?.firstName,
              last_name: values?.lastName,
              phone_number: values?.phoneNumber,
              birthday: values?.birthday
                ? formatDateToYyyyMmDd(new Date(values?.birthday))
                : null,
              enable: values?.enable === true ? 1 : 0,
              role_id: values?.role_id,
            },
            accessToken
          );
          onSubmitSuccess(res2);
        }
      }
    } catch (err) {
      onSubmitError(err);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      inputRef.current?.focus({
        cursor: "start",
      });
    }, 100);

    if (!drawerRightVisible) {
      form.resetFields();
      form.setFieldsValue({
        gender: 0,
        enable: true,
      });
    } else {
      onFill(selectedRows[0]);
    }
  }, [drawerRightVisible, form, selectedRows]);
  useEffect(() => {
    if (isRefetch && location.pathname === selectedTab) {
      dispatch(closeDrawerRight());
      dispatch(setSelectedRows([]));
      dispatch(setIsRefetch(false));
    }
  }, [isRefetch]);
  return (
    <FormCustom
      form={form}
      name={formName}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Vui lòng nhập email!" },
          { type: "email", message: "Email không hợp lệ!" },
        ]}
      >
        <Input size="large" ref={inputRef} placeholder="Nhập email..." />
      </Form.Item>

      {!isUpdateForm && (
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password
            size="large"
            placeholder="Nhập mật khẩu..."
            iconRender={(visiblePW) =>
              visiblePW ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
      )}

      <Form.Item
        name="role_id"
        label="Vai trò"
        rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
      >
        <Select
          size="large"
          options={roleOptions}
          placeholder="Chọn vai trò"
          getPopupContainer={(triggerNode) => triggerNode.parentElement}
        />
      </Form.Item>

      <Form.Item
        name="firstName"
        label="Họ"
        rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
      >
        <Input size="large" placeholder="Nhập họ..." />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Tên"
        rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
      >
        <Input size="large" placeholder="Nhập tên..." />
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        label="Số điện thoại"
        rules={[
          { required: true, message: "Vui lòng nhập số điện thoại!" },
          { pattern: /^[0-9]+$/, message: "Số điện thoại chỉ chứa chữ số!" },
        ]}
      >
        <Input size="large" placeholder="Nhập số điện thoại..." />
      </Form.Item>

      <Form.Item
        name="birthday"
        label="Ngày sinh"
        rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
      >
        <DatePicker
          size="large"
          format={"YYYY-MM-DD"}
          placeholder="Chọn ngày sinh"
          style={{ width: "100%" }}
          getPopupContainer={(triggerNode: any) => {
            return triggerNode.parentElement;
          }}
        />
      </Form.Item>

      {isUpdateForm && (
        <Form.Item
          name="enable"
          label="Trạng thái hoạt động"
          rules={[{ required: false }]}
          valuePropName="checked"
        >
          <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
        </Form.Item>
      )}
    </FormCustom>
  );
}
