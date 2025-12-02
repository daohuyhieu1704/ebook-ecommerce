import React, { useMemo, useEffect } from "react";
import { Col, Row, Empty, message, Spin, Checkbox } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useLocation, useNavigate } from "react-router-dom";
import {
  selectCartItems,
  clearCart,
  setCartData,
  CartItem,
  BookData,
  selectSession,
} from "./CartSlice";
import {
  CheckoutWrapper,
  SectionCard,
  SectionTitle,
  CartItemRow,
  TotalRow,
} from "./Checkout.style";
import {
  selectIsRefetch,
  selectSelectedKey,
  setIsRefetch,
} from "../layout/layoutSlice";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import { FAIL_IMG, PATH } from "../../constants/common";
import { CartAPI } from "../../api/CartAPI";
import { selectAccessToken, selectUserInfo } from "../Login/LoginSlice";
import {
  AddToCartBtn,
  BookCard,
  CardContent,
  CardImageWrapper,
  CheckWrapper,
  ColFive,
} from "../Book/Book.style";
import { ShoppingCartOutlined } from "@ant-design/icons";

export default function Checkout() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const session = useAppSelector(selectSession);
  const cartItems = useAppSelector(selectCartItems);
  const selectedTab = useAppSelector(selectSelectedKey);
  const isRefetch = useAppSelector(selectIsRefetch);
  const accToken = useAppSelector(selectAccessToken);
  const userInfo = useAppSelector(selectUserInfo);
  const userRole = userInfo?.role_id || "customer";

  const totalAmountVND = useMemo(() => {
    return cartItems.reduce((total: number, item: any) => {
      return total + item.price * item.quantity;
    }, 0);
  }, [cartItems]);

  const totalAmountUSD = useMemo(() => {
    return (totalAmountVND / 25000).toFixed(2);
  }, [totalAmountVND]);

  const onSuccess = (res: any) => {
    const { session, items } = res.data?.data || {};

    if (!session || !items) {
      console.error("Dữ liệu giỏ hàng không đúng định dạng:", res.data);
      return;
    }

    const formattedItems = items.map((item: any, index: number) => ({
      ...item,
      key: item.id,
      STT: index + 1,
    }));

    dispatch(
      setCartData({
        session: session,
        items: formattedItems,
      })
    );
  };

  const onError = (err: any) => {
    NotificationCustom({
      type: "error",
      message: "Error",
      description: err.data?.message,
    });
  };

  const getData = async () => {
    await CartAPI.getCart(accToken)
      .then((res) => onSuccess(res))
      .catch((err) => onError(err));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleToggleCheckOrderItems = (e: any, cartItem: any) => {
    e.stopPropagation();

    const newCheckedState = e.target.checked;
    console.log(`Toggle Item ${cartItem.id}:`, newCheckedState);
  };

  function changeHandler(item: any) {}

  useEffect(() => {
    if (isRefetch && location.pathname === selectedTab) {
      getData();
      dispatch(setIsRefetch(false));
    }
  }, [isRefetch]);

  const handleApprove = (orderId: string) => {
    // Gọi API Backend để lưu đơn hàng vào database của bạn tại đây
    // await OrderAPI.createOrder({ ... })

    NotificationCustom({
      type: "success",
      message: "Thanh toán thành công!",
      description: `Mã giao dịch PayPal: ${orderId}`,
    });

    dispatch(clearCart());
    navigate(PATH.HOME);
  };

  if (cartItems.length === 0) {
    return (
      <CheckoutWrapper>
        <Empty
          description={<span style={{ color: "white" }}>Giỏ hàng trống</span>}
        />
      </CheckoutWrapper>
    );
  }

  return (
    <CheckoutWrapper>
      <Row gutter={24}>
        <Col xs={24} md={14}>
          <SectionCard>
            <SectionTitle>
              Đơn hàng của bạn ({cartItems.length} sản phẩm)
            </SectionTitle>
            <Row gutter={[24, 24]}>
              {cartItems.map((cartItem: CartItem) => {
                const book = cartItem.book;
                if (!book) return null;

                return (
                  <ColFive key={cartItem.id} xs={24} sm={12} md={8} lg={6}>
                    <BookCard
                      $role={userRole}
                      hoverable
                      onClick={() => changeHandler(book)}
                    >
                      <CardImageWrapper>
                        <CheckWrapper onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={cartItem.checked}
                            onChange={(e) =>
                              handleToggleCheckOrderItems(e, cartItem)
                            }
                          />
                        </CheckWrapper>

                        <img
                          src={book.image || FAIL_IMG}
                          alt={book.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = FAIL_IMG;
                          }}
                        />
                      </CardImageWrapper>

                      <CardContent>
                        <div className="book-title" title={book.title}>
                          {book.title}
                        </div>
                        <div className="book-author">
                          {book.Author?.name || "N/A"}
                        </div>
                        <div className="book-category">
                          {book.Category?.name || "N/A"}
                        </div>

                        <div className="price-row">
                          <div className="book-price">
                            {book.price
                              ? new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(book.price)
                              : "Liên hệ"}
                          </div>
                          {/* <div style={{ fontSize: "0.9rem", color: "#888" }}>
                            SL: <strong>{cartItem.quantity}</strong>
                          </div> */}
                        </div>
                      </CardContent>
                    </BookCard>
                  </ColFive>
                );
              })}
            </Row>
            <TotalRow>
              <span className="total-label">Tổng cộng:</span>
              <span className="total-value">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(session?.total ?? 0)}
              </span>
            </TotalRow>
          </SectionCard>
        </Col>
        <Col xs={24} md={10}>
          <SectionCard>
            <SectionTitle>Thanh toán</SectionTitle>

            <PayPalScriptProvider
              options={{
                // clientId: `${process.env.PAYPAL_ID}`,
                clientId:
                  "AYQsMan5btdMjoevt1YHi5R0f7p--3w3jCB1qpeOJ6O53PXe0Rwh4OcB_v5wCo3JWLUihkGtjGDbPezv",
                currency: "USD",
              }}
            >
              <PayPalButtons
                style={{
                  layout: "vertical",
                  color: "gold",
                  shape: "rect",
                  label: "checkout",
                }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        description: "Thanh toán đơn hàng EBook",
                        amount: {
                          currency_code: "USD",
                          value: totalAmountUSD,
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  const order = await actions.order?.capture();
                  console.log("PayPal Success:", order);
                  handleApprove(order?.id || "");
                }}
                onError={(err) => {
                  console.error("PayPal Error:", err);
                  NotificationCustom({
                    type: "error",
                    message: "Lỗi thanh toán",
                    description: "Không thể xử lý thanh toán PayPal lúc này.",
                  });
                }}
              />
            </PayPalScriptProvider>

            <div
              style={{
                marginTop: "20px",
                fontSize: "0.85rem",
                color: "#888",
                textAlign: "center",
              }}
            >
              Tỉ giá quy đổi tham khảo: 1 USD = 25,000 VND
            </div>
          </SectionCard>
        </Col>
      </Row>
    </CheckoutWrapper>
  );
}
