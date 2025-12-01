import { Form, Input, Button, Checkbox } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import { LoginFormTitle, LoginFormWrapper, LoginWrapper } from "./Login.style";
import { useAppDispatch } from "../../app/hooks";
import { loginSuccess } from "./LoginSlice";
import { LOCAL_STORAGE_ITEM, PATH } from "../../constants/common";
import { useState } from "react";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import colors from "../../theme/colors";
import { AuthenAPI } from "../../api/AuthenAPI";

type LoginType = {
  username: string;
  password: string;
  remember?: boolean;
};

export const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const location: any = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const from = location.state?.from?.pathname || PATH.HOME;

  const onFinish = (values: LoginType) => {
    setLoading(true);

    AuthenAPI.LogIn({
      email: values.username,
      password: values.password,
    })
      .then(({ data }) => {
        if (data?.status !== "success" && data?.status !== 200) {
          setLoading(false);
          NotificationCustom({
            type: "error",
            message: "Đăng nhập thất bại",
            description: data?.message || "Có lỗi xảy ra",
          });
        } else {
          console.log("Success Data:", data?.data);

          const apiData = data?.data;

          setLoading(false);
          dispatch(
            loginSuccess({
              user: apiData.user,
              roles: apiData.system_roles || [],
              permissions: apiData.permissions || [],
              accessToken: apiData.accessToken,
              refreshToken: apiData.refreshToken,
              remember: values.remember,
            })
          );

          NotificationCustom({
            type: "success",
            message: "Thành công",
            description: `Chào mừng ${
              apiData.user.name || "bạn"
            } quay trở lại!`,
          });

          navigate(from, { replace: true });
        }
      })
      .catch((error: any) => {
        setLoading(false);
        const errorMsg =
          error?.response?.data?.message ||
          error?.message ||
          "Lỗi kết nối server";
        NotificationCustom({
          type: "error",
          message: "Lỗi",
          description: errorMsg,
        });
      });
  };

  return (
    <LoginWrapper>
      <LoginFormWrapper>
        <div>
          <LoginFormTitle>Ebook System Management</LoginFormTitle>
          <Form
            name="login"
            form={form}
            layout={"vertical"}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            requiredMark={false}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Đây là mục bắt buộc!",
                },
              ]}
            >
              <Input
                size={"large"}
                placeholder="Địa chỉ e-mail"
                className="input-username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Đây là mục bắt buộc!",
                },
              ]}
            >
              <Input.Password size={"large"} placeholder="Mật khẩu" />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox style={{ color: colors.primary }}>
                Nhớ mật khẩu?
              </Checkbox>
            </Form.Item>

            <Form.Item
              style={{ height: 0, marginBottom: 0 }}
              className="login-btn"
            >
              <Button
                loading={loading}
                size={"large"}
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  height: "55px",
                  position: "absolute",
                  top: "0px",
                  backgroundColor: colors.primary,
                  border: "none",
                }}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
      </LoginFormWrapper>
    </LoginWrapper>
  );
};
