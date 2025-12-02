import styled, { css } from "styled-components";
import { Card, Button, Col } from "antd";
import { themeGet } from "@styled-system/theme-get";

interface BookCardProps {
  $role?: string;
}

export const BookContainer = styled.div`
  padding-bottom: 2rem;
`;

export const BookCard = styled(Card)<BookCardProps>`
  background-color: ${themeGet("colors.secondary")} !important;
  border: 1px solid ${themeGet("colors.border")} !important;
  cursor: pointer;
  transition: all 0.4s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  // Reset padding body
  .ant-card-body {
    padding: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: ${themeGet("colors.highlight")} !important;

    ${(props) =>
      props.$role === "customer" &&
      css`
        box-shadow: 0 0 5px ${themeGet("colors.highlight")},
          0 0 15px ${themeGet("colors.highlight")};

        // Hiệu ứng nút giỏ hàng khi hover card
        .add-to-cart-btn {
          background-color: ${themeGet("colors.highlight")};
          color: ${themeGet("colors.white")};
          box-shadow: 0 0 10px ${themeGet("colors.highlight")};
        }
      `}
  }
`;

export const CardImageWrapper = styled.div`
  width: 100%;
  height: 240px; // Chiều cao ảnh
  background-color: ${themeGet("colors.primary")};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  // Zoom ảnh khi hover
  ${BookCard}:hover & img {
    transform: scale(1.1);
  }
`;

export const CardContent = styled.div`
  padding: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;

  .book-title {
    color: ${themeGet("colors.textColor")};
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 4px;
    display: -webkit-box;
    -webkit-line-clamp: 2; // Giới hạn 2 dòng
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .book-author {
    color: ${themeGet("colors.dark")};
    font-size: 0.9rem;
    margin-bottom: 4px;
  }

  .book-category {
    font-size: 0.8rem;
    color: #888;
    margin-bottom: 8px;
  }

  .price-row {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    border-top: 1px solid ${themeGet("colors.border")};
  }

  .book-price {
    font-size: 1.1rem;
    font-weight: bold;
    color: ${themeGet("colors.highlight")};
  }
`;

export const AddToCartBtn = styled(Button)`
  border-radius: 20px;
  height: 32px;
  padding: 0 15px;
  border: 1px solid ${themeGet("colors.highlight")};
  background-color: transparent;
  color: ${themeGet("colors.highlight")};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${themeGet("colors.highlight")} !important;
    color: ${themeGet("colors.white")} !important;
    border-color: ${themeGet("colors.highlight")} !important;
  }
`;

export const ColFive = styled(Col)`
  // Mặc định cho các màn hình nhỏ (Mobile/Tablet) sẽ theo props xs, sm, md...

  // Màn hình lớn (XL - Desktop): Ép về 20%
  @media (min-width: 1200px) {
    flex: 0 0 20% !important;
    max-width: 20% !important;
  }
`;

export const CheckWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  .ant-checkbox-inner {
    background-color: transparent;
    border-color: #fff;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${themeGet("colors.highlight")};
    border-color: ${themeGet("colors.highlight")};
  }
`;
