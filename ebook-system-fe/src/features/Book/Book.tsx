import { Button, Row, Col, Spin, Empty, Radio, Tooltip } from "antd";
import {
  AppstoreOutlined,
  BarsOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BookAPI } from "../../api/BookAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import TableLayout from "../../components/TableLayout/TableLayout";
import { theme } from "../../theme/theme";
import {
  openDrawerBottom,
  selectIsRefetch,
  selectSelectedKey,
  setIsRefetch,
  setSelectedRows,
} from "../layout/layoutSlice";
import { selectDataBook, setDataBook } from "./BookSlice";
import { selectAccessToken, selectUserInfo } from "../Login/LoginSlice";
import ButtonFeature from "../../components/ButtonFeature/ButtonFeature";
import { FAIL_IMG } from "../../constants/common";
import colors from "../../theme/colors";

import { addToCart } from "../Checkout/CartSlice";

import {
  BookCard,
  BookContainer,
  CardImageWrapper,
  CardContent,
  AddToCartBtn,
} from "./Book.style";
import { CartAPI } from "../../api/CartAPI";

export default function Book() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>();
  const [offset, setOffset] = useState<number>(0);
  const [visible, setVisible] = useState(false);

  const data = useAppSelector(selectDataBook);
  const userInfo = useAppSelector(selectUserInfo);
  const userRole = userInfo?.role_id || "customer";

  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  const selectedTab = useAppSelector(selectSelectedKey);
  const isRefetch = useAppSelector(selectIsRefetch);
  const accToken = useAppSelector(selectAccessToken);

  useEffect(() => {
    if (userRole === "customer") {
      setViewMode("card");
    } else {
      setViewMode("table");
    }
  }, [userRole]);

  function changeHandler(item: any) {
    setVisible(true);
    dispatch(openDrawerBottom());
    dispatch(setSelectedRows([item]));
  }

  const handleAddToCart = async (e: React.MouseEvent, book: any) => {
    e.stopPropagation();

    if (!book.price) {
      NotificationCustom({
        type: "warning",
        message: "Thông báo",
        description: "Sản phẩm này hiện chưa có giá bán.",
      });
      return;
    }

    try {
      await CartAPI.addToCart(accToken, book.id);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Lỗi server khi thêm vào giỏ.";
      NotificationCustom({
        type: "error",
        message: "Thất bại",
        description: errorMessage,
      });
      return;
    }

    dispatch(
      addToCart({
        id: book.id,
        title: book.title,
        price: book.price,
        image: book.image || FAIL_IMG,
        author: book.Author?.name,
      })
    );

    NotificationCustom({
      type: "success",
      message: "Đã thêm vào giỏ",
      description: `Sách "${book.title}" đã được thêm vào giỏ hàng.`,
    });
  };

  const columns: object[] = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      width: theme.indexWidth,
      align: "right",
    },
    {
      title: "Tên",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      width: "200px",
    },
    {
      title: "Tác giả",
      dataIndex: "Author",
      key: "Author",
      width: "200px",
      render: (value: any) => <span>{value?.name}</span>,
    },
    {
      title: "Thể loại",
      dataIndex: "Category",
      key: "Category",
      width: "150px",
      render: (value: any) => <span>{value?.name}</span>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      align: "right",
      width: "80px",
      render: (value: any) => (
        <span>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(value)}
        </span>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (value: string, item: any) => {
        return (
          <Row justify="space-between">
            <span
              style={{
                width: "300px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {value}
            </span>
            <ButtonFeature
              value={value}
              item={item}
              changeHandler={() => changeHandler(item)}
            />
          </Row>
        );
      },
    },
  ];

  const onSuccess = (res: any) => {
    setLoading(false);
    const dataSrc = res.data?.data
      .reverse()
      .map((data: any, index: number) => ({
        STT: index + 1,
        key: data.id,
        ...data,
      }));
    console.log(dataSrc);
    dispatch(setDataBook(dataSrc));
  };

  const onError = (err: any) => {
    setLoading(false);
    NotificationCustom({
      type: "error",
      message: "Error",
      description: err.data?.message,
    });
  };

  const getData = () => {
    setLoading(true);
    BookAPI.getAllBooks(`${accToken}`)
      .then((res) => onSuccess(res))
      .catch((err) => onError(err));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (isRefetch && location.pathname === selectedTab) {
      getData();
      dispatch(setIsRefetch(false));
    }
  }, [isRefetch]);

  const renderCardView = () => {
    if (loading) {
      return (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Spin size="large" />
        </div>
      );
    }

    if (!data || data.length === 0) {
      return (
        <Empty
          description={<span style={{ color: "white" }}>Không có dữ liệu</span>}
        />
      );
    }

    return (
      <BookContainer>
        <Row gutter={[24, 24]}>
          {data.map((book: any) => (
            <Col key={book.id} xs={24} sm={12} md={8} lg={6} xl={6}>
              <BookCard
                $role={userRole}
                hoverable
                onClick={() => changeHandler(book)}
              >
                <CardImageWrapper>
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

                    <AddToCartBtn
                      className="add-to-cart-btn"
                      onClick={(e) => handleAddToCart(e, book)}
                    >
                      <ShoppingCartOutlined /> Thêm
                    </AddToCartBtn>
                  </div>
                </CardContent>
              </BookCard>
            </Col>
          ))}
        </Row>
      </BookContainer>
    );
  };

  return (
    <>
      {userRole === "customer" && (
        <Row justify="end" style={{ marginBottom: "16px" }}>
          <Radio.Group
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            buttonStyle="solid"
          >
            <Tooltip title="Xem dạng lưới">
              <Radio.Button
                value="card"
                style={{
                  backgroundColor:
                    viewMode === "card" ? colors.highlight : colors.secondary,
                  borderColor: colors.border,
                  color: viewMode === "card" ? "white" : colors.textColor,
                }}
              >
                <AppstoreOutlined />
              </Radio.Button>
            </Tooltip>
            <Tooltip title="Xem dạng danh sách">
              <Radio.Button
                value="table"
                style={{
                  backgroundColor:
                    viewMode === "table" ? colors.highlight : colors.secondary,
                  borderColor: colors.border,
                  color: viewMode === "table" ? "white" : colors.textColor,
                }}
              >
                <BarsOutlined />
              </Radio.Button>
            </Tooltip>
          </Radio.Group>
        </Row>
      )}

      {viewMode === "card" ? (
        renderCardView()
      ) : (
        <TableLayout
          checkbox={false}
          bordered={true}
          columns={columns}
          dataSource={data}
          loading={loading}
          total={count}
          setOffset={setOffset}
          $userRole={userRole}
        />
      )}
    </>
  );
}
