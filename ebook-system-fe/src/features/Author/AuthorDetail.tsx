import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectSelectedRows } from "../layout/layoutSlice";
import { selectUserInfo } from "../Login/LoginSlice";
import { Col, Image, Row } from "antd";
import { FAIL_IMG } from "../../constants/common";

import {
  DetailWrapper,
  AuthorInfoCard,
  ImageContainer,
  StyledTitle,
  StyledText,
} from "./AuthorForm.style";

export default function AuthorDetail() {
  const selectedRows = useAppSelector(selectSelectedRows);

  const userInfo = useAppSelector(selectUserInfo);
  const userRole = userInfo?.role_id || "customer";

  useEffect(() => {
    console.log(selectedRows[0]);
  }, [selectedRows]);

  if (!selectedRows || selectedRows.length === 0) return null;
  const author = selectedRows[0];

  return (
    <DetailWrapper>
      {/* Container chính bao quanh */}
      <AuthorInfoCard $role={userRole}>
        <Row
          align="middle"
          justify="space-between"
          style={{ marginBottom: "2rem" }}
        >
          <StyledTitle level={3}>Thông tin tác giả</StyledTitle>
        </Row>

        <Row gutter={[24, 24]} align="top">
          <Col xs={24} md={16} lg={18}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <StyledText className="label">Tên:</StyledText>
                <StyledText style={{ fontSize: "1.2rem", fontWeight: 600 }}>
                  {author?.name}
                </StyledText>
              </div>

              <div>
                <StyledText
                  className="label"
                  style={{ display: "block", marginBottom: "8px" }}
                >
                  Tiểu sử:
                </StyledText>
                <StyledText
                  style={{
                    lineHeight: "1.6",
                    textAlign: "justify",
                    display: "block",
                  }}
                >
                  {author?.description || "Chưa có thông tin tiểu sử."}
                </StyledText>
              </div>
            </div>
          </Col>

          <Col
            xs={24}
            md={8}
            lg={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <ImageContainer $role={userRole}>
              <Image
                width={200}
                src={author?.img}
                fallback={FAIL_IMG}
                style={{ maxHeight: "300px" }}
              />
            </ImageContainer>
          </Col>
        </Row>
      </AuthorInfoCard>
    </DetailWrapper>
  );
}
