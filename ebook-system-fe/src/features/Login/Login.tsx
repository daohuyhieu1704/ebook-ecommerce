import {
  Form,
  Input,
  Button,
  Checkbox,
  Radio,
  Row,
  Col,
  Typography,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginFormTitle, LoginFormWrapper, LoginWrapper } from "./Login.style";
import { useAppDispatch } from "../../app/hooks";
import { loginSuccess } from "./LoginSlice";
import { LOCAL_STORAGE_ITEM, PATH } from "../../constants/common";
import { useState } from "react";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import colors from "../../theme/colors"; // Đã import hệ màu tối của bạn
import { AuthenAPI } from "../../api/AuthenAPI";

const { Text, Link } = Typography;

type AuthFormValues = {
  username: string;
  password: string;
  remember?: boolean;
  firstName?: string;
  lastName?: string;
  confirmPassword?: string;
  role?: string;
};

export const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const location: any = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [isRegister, setIsRegister] = useState(false);

  const from = location.state?.from?.pathname || PATH.HOME;

  const onFinish = (values: AuthFormValues) => {
    setLoading(true);
    if (isRegister) {
      if (values.password !== values.confirmPassword) {
        setLoading(false);
        NotificationCustom({
          type: "error",
          message: "Lỗi",
          description: "Mật khẩu nhập lại không khớp!",
        });
        return;
      }

      AuthenAPI.Register({
        email: values.username,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        role: values.role,
      })
        .then((res) => {
          setLoading(false);
          NotificationCustom({
            type: "success",
            message: "Đăng ký thành công",
            description: "Vui lòng đăng nhập để tiếp tục.",
          });
          setIsRegister(false);
          form.setFieldsValue({ password: "", confirmPassword: "" });
        })
        .catch((error: any) => {
          setLoading(false);
          const errorMsg = error?.response?.data?.message || "Đăng ký thất bại";
          NotificationCustom({
            type: "error",
            message: "Lỗi",
            description: errorMsg,
          });
        });
    } else {
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
            const apiData = data?.data;
            console.log(apiData);
            setLoading(false);
            dispatch(
              loginSuccess({
                user: apiData.user,
                systemRoles: apiData.systemRoles || [],
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
    }
  };

  return (
    <LoginWrapper>
      <LoginFormWrapper>
        <div>
          <LoginFormTitle>
            {isRegister ? "Đăng Ký Tài Khoản" : "Ebook System Management"}
          </LoginFormTitle>
          <Form
            name="auth-form"
            form={form}
            layout={"vertical"}
            initialValues={{ remember: true, role: "customer" }}
            onFinish={onFinish}
            autoComplete="off"
            requiredMark={false}
          >
            {isRegister && (
              <>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="firstName"
                      rules={[{ required: true, message: "Nhập họ!" }]}
                    >
                      <Input size="large" placeholder="Họ" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="lastName"
                      rules={[{ required: true, message: "Nhập tên!" }]}
                    >
                      <Input size="large" placeholder="Tên" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="role"
                  label={
                    <Text style={{ color: colors.textColor }}>Bạn là:</Text>
                  }
                  rules={[
                    { required: true, message: "Vui lòng chọn vai trò!" },
                  ]}
                >
                  {/* Radio.Group/Button cần được style bằng CSS hoặc AntD theme override 
                      để có màu nền/chữ tối phù hợp hơn */}
                  <Radio.Group buttonStyle="solid" style={{ width: "100%" }}>
                    <Radio.Button
                      value="customer"
                      style={{ width: "50%", textAlign: "center" }}
                    >
                      Khách hàng
                    </Radio.Button>
                    <Radio.Button
                      value="employee"
                      style={{ width: "50%", textAlign: "center" }}
                    >
                      Nhân viên
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </>
            )}
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập Email!" },
                { type: "email", message: "Email không hợp lệ!" },
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
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password size={"large"} placeholder="Mật khẩu" />
            </Form.Item>
            {isRegister && (
              <Form.Item
                name="confirmPassword"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Vui lòng nhập lại mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật khẩu nhập lại không khớp!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  size={"large"}
                  placeholder="Nhập lại mật khẩu"
                />
              </Form.Item>
            )}

            {!isRegister && (
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox style={{ color: colors.textColor }}>
                  Nhớ mật khẩu?
                </Checkbox>
              </Form.Item>
            )}

            <Form.Item>
              <Button
                loading={loading}
                size={"large"}
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  height: "55px",
                  backgroundColor: colors.highlight || colors.primaryHover,
                  border: "none",
                  fontWeight: "bold",
                }}
              >
                {isRegister ? "Đăng Ký" : "Đăng Nhập"}
              </Button>
            </Form.Item>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              {isRegister ? (
                <Text style={{ color: colors.textColor }}>
                  Đã có tài khoản?{" "}
                  <Link
                    strong
                    onClick={() => setIsRegister(false)}
                    style={{ color: colors.highlight || colors.primaryHover }}
                  >
                    Đăng nhập ngay
                  </Link>
                </Text>
              ) : (
                <Text style={{ color: colors.textColor }}>
                  Chưa có tài khoản?{" "}
                  <Link
                    strong
                    onClick={() => {
                      setIsRegister(true);
                      form.resetFields();
                    }}
                    style={{ color: colors.highlight || colors.primaryHover }}
                  >
                    Đăng ký ngay
                  </Link>
                </Text>
              )}
            </div>
          </Form>
        </div>
      </LoginFormWrapper>
    </LoginWrapper>
  );
};
