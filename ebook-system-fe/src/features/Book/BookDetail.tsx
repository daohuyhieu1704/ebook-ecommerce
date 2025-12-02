import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectSelectedRows } from "../layout/layoutSlice";
import { selectAccessToken, selectUserInfo } from "../Login/LoginSlice";
import { Avatar, Col, Image, Row } from "antd"; // Bỏ Typography, Divider gốc
import { HomeOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import TableLayout from "../../components/TableLayout/TableLayout";
import { selectDataFeedback, setDataFeedback } from "./BookSlice";
import { FeedbackAPI } from "../../api/FeedbackAPI";
import { theme } from "../../theme/theme";
import { FAIL_IMG } from "../../constants/common";

import {
  DetailWrapper,
  LeftInfoColumn,
  StyledText,
  StyledTitle,
  StyledDivider,
  AuthorImageWrapper,
} from "./BookDetail.style";

export default function BookDetail() {
  const dispatch = useDispatch();
  const selectedRows = useAppSelector(selectSelectedRows);
  const dataFeedback = useAppSelector(selectDataFeedback);
  const accessToken = useAppSelector(selectAccessToken);

  const userInfo = useAppSelector(selectUserInfo);
  const userRole = userInfo?.role_id || "customer";

  useEffect(() => {
    if (selectedRows[0]) {
      FeedbackAPI.getAllFeedbacks(selectedRows[0].id, accessToken)
        .then((res) => {
          console.log(res);
          dispatch(setDataFeedback(res.data.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedRows, accessToken, dispatch]);

  const FeedbackColumns: object[] = [
    {
      key: "STT",
      title: "STT",
      dataIndex: "STT",
      width: theme.checkBoxWidth,
      align: "right",
    },
    {
      title: "Star",
      key: "start",
      dataIndex: "hoten",
      width: "200px",
    },
    {
      title: "Comment",
      key: "Comment",
      dataIndex: "Comment",
      width: "140px",
      elipsis: true,
      render: (data: string) => {
        return <div>{data}</div>;
      },
    },
  ];

  if (!selectedRows || selectedRows.length === 0) return null;
  const book = selectedRows[0];

  return (
    <DetailWrapper>
      <Row justify="start" style={{ height: "100%" }} gutter={24}>
        <Col span={6} style={{ height: "100%" }}>
          <LeftInfoColumn $role={userRole}>
            <Row>
              <Avatar size={60} icon={<HomeOutlined />} />
            </Row>

            <Row style={{ marginTop: "1rem" }}>
              <StyledTitle level={4}>
                {book?.id_phong || book?.title}
              </StyledTitle>
            </Row>

            <StyledDivider style={{ width: "100%" }} />

            <Row
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Row style={{ marginTop: "1rem" }}>
                <StyledText
                  className="strong"
                  style={{ marginRight: "0.5rem" }}
                >
                  Tác giả:
                </StyledText>
                <StyledText>{book?.Author?.name}</StyledText>
              </Row>

              <Row style={{ marginTop: "1rem" }}>
                <StyledText
                  className="strong"
                  style={{ marginRight: "0.5rem" }}
                >
                  Thể loại:
                </StyledText>
                <StyledText>{book?.Category?.name}</StyledText>
              </Row>

              <Row style={{ marginTop: "1rem" }}>
                <StyledText
                  className="strong"
                  style={{ marginRight: "0.5rem" }}
                >
                  Giá:
                </StyledText>
                <StyledText>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(book?.price || 0)}
                </StyledText>
              </Row>
            </Row>
          </LeftInfoColumn>
        </Col>

        <Col span={18}>
          <Row align="stretch" justify="space-between">
            <Col span={16}>
              <Row
                align="middle"
                justify="space-between"
                style={{ marginBottom: "1rem" }}
              >
                <StyledTitle level={4}>Về tác giả:</StyledTitle>
              </Row>
              <Row
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <Row style={{ marginTop: "1rem" }}>
                  <StyledText
                    className="strong"
                    style={{ marginRight: "0.5rem" }}
                  >
                    Tên:
                  </StyledText>
                  <StyledText>{book?.Author?.name}</StyledText>
                </Row>
                <Row style={{ marginTop: "1rem" }}>
                  <StyledText
                    className="strong"
                    style={{ marginRight: "0.5rem" }}
                  >
                    Tiểu sử:
                  </StyledText>
                  <StyledText>{book?.Author?.description}</StyledText>
                </Row>
              </Row>
            </Col>

            <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
              <AuthorImageWrapper $role={userRole}>
                <Image
                  width={150}
                  src={book?.Author?.img}
                  fallback={FAIL_IMG}
                />
              </AuthorImageWrapper>
            </Col>
          </Row>

          <StyledDivider style={{ width: "100%", margin: "24px 0" }} />

          <Row style={{ marginBottom: "1rem" }}>
            <Col span={24}>
              <Row
                align="middle"
                justify="space-between"
                style={{ marginBottom: "1rem" }}
              >
                <StyledText strong style={{ fontSize: "1.2rem" }}>
                  Phản hồi:
                </StyledText>
              </Row>
              <Row>
                <TableLayout
                  checkbox={false}
                  columns={FeedbackColumns}
                  dataSource={dataFeedback}
                  loading={false}
                  total={dataFeedback?.length || 0}
                  setOffset={() => {}}
                  size="small"
                  $userRole={userRole}
                />
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </DetailWrapper>
  );
}
