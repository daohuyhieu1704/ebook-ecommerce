import { Form, Input } from "antd"; // Vẫn giữ import Form
import React, { useEffect, useRef } from "react";
import {
  closeDrawerRight,
  selectDrawerRightVisible,
  selectIsUpdateForm,
  selectSelectedRows,
  setIsLoadingSubmit,
  setIsRefetch,
} from "../layout/layoutSlice";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAccessToken } from "../Login/LoginSlice";
import { CategoryAPI } from "../../api/CategoryAPI";

import { FormCustom } from "./Category.style";

type FormProps = {
  formName: string;
};

export default function CategoryForm(props: FormProps) {
  const { formName } = props;
  const inputRef = useRef(null);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const drawerRightVisible = useAppSelector(selectDrawerRightVisible);
  const isUpdateForm = useAppSelector(selectIsUpdateForm);
  const selectedRows = useAppSelector(selectSelectedRows);
  const accessToken = useAppSelector(selectAccessToken);

  const onSubmitSuccess = () => {
    form.resetFields();
    dispatch(setIsRefetch(true));
    dispatch(closeDrawerRight());
    dispatch(setIsLoadingSubmit(false));

    NotificationCustom({
      type: "success",
      message: "Success",
      description:
        selectedRows?.length > 0
          ? "Cập nhật thành công!"
          : "Tạo mới thành công!",
    });
  };

  const onSubmitError = (error: any) => {
    dispatch(setIsLoadingSubmit(false));

    NotificationCustom({
      type: "error",
      message: "Error",
      description: error.response ? error.response.data.message : error.message,
    });
  };

  const onFinish = async (values: any) => {
    dispatch(setIsLoadingSubmit(true));
    try {
      if (isUpdateForm) {
        await CategoryAPI.UpdateCategory(
          {
            id: selectedRows[0].id,
            name: values.name,
            description: values.description,
          },
          accessToken
        );
        onSubmitSuccess();
      } else {
        const res = await CategoryAPI.AddCategory(
          {
            name: values.name,
            description: values.description,
          },
          accessToken
        );
        const { message } = res.data;
        NotificationCustom({
          type: "success",
          message: "Thành công",
          description: `${message}`,
        });
        onSubmitSuccess();
      }
    } catch (err) {
      onSubmitError(err);
    }
  };

  const onFill = (values: any) => {
    if (values) {
      form.setFieldsValue({
        name: values.name,
        description: values.description,
      });
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
    } else {
      onFill(selectedRows[0]);
    }
  }, [drawerRightVisible]);

  return (
    <FormCustom
      form={form}
      name={formName}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="name"
        label="Tên danh mục"
        rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
      >
        <Input
          size="large"
          ref={inputRef}
          style={{ zIndex: 9999 }}
          placeholder="Nhập tên danh mục..."
        />
      </Form.Item>

      <Form.Item
        name="description"
        label="Mô tả"
        rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
      >
        <TextArea rows={4} placeholder="Nhập mô tả..." />
      </Form.Item>
    </FormCustom>
  );
}
