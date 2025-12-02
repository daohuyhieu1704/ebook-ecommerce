import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const CheckoutWrapper = styled.div`
  padding: 24px;
  min-height: 100vh;
  background-color: ${themeGet("colors.backgroundColor")};
  color: ${themeGet("colors.textColor")};
`;

export const SectionCard = styled.div`
  background-color: ${themeGet("colors.secondary")};
  border: 1px solid ${themeGet("colors.border")};
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

export const SectionTitle = styled.h3`
  color: ${themeGet("colors.textColor")};
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 20px;
  border-bottom: 1px solid ${themeGet("colors.border")};
  padding-bottom: 10px;
`;

export const CartItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid ${themeGet("colors.border")};

  &:last-child {
    border-bottom: none;
  }

  // Wrapper chứa ảnh và thông tin text
  .item-left {
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1;
  }

  // Ảnh thumbnail
  .item-image {
    width: 60px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
    border: 1px solid ${themeGet("colors.border")};
    background-color: ${themeGet("colors.primary")};
  }

  .item-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .item-name {
    font-weight: 600;
    font-size: 1rem;
    color: ${themeGet("colors.textColor")};
    margin-bottom: 4px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .item-meta {
    font-size: 0.85rem;
    color: ${themeGet("colors.dark")};
  }

  .item-right {
    text-align: right;
    min-width: 100px;
  }

  .item-price {
    font-weight: bold;
    font-size: 1.1rem;
    color: ${themeGet("colors.highlight")};
    text-shadow: 0 0 8px ${themeGet("colors.highlight")}; // Neon nhẹ
  }
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px dashed ${themeGet("colors.border")};
  font-size: 1.2rem;
  font-weight: 700;

  .total-label {
    color: ${themeGet("colors.textColor")};
  }

  .total-value {
    color: ${themeGet("colors.highlight")};
    font-size: 1.5rem;
    text-shadow: 0 0 10px ${themeGet("colors.highlight")}; // Neon effect cho giá tổng
  }
`;
