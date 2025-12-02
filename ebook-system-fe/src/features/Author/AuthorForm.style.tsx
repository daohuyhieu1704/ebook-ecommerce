import styled, { css } from "styled-components";
import { Form, Typography } from "antd";
import { themeGet } from "@styled-system/theme-get";

interface RoleProps {
  $role?: string;
}

export const FormCustom = styled(Form)`
  .ant-form-item-label > label {
    color: ${themeGet("colors.textColor")} !important;
  }

  .ant-input {
    background-color: ${themeGet("colors.gray")} !important;
    color: ${themeGet("colors.textColor")} !important;
    border: 1px solid ${themeGet("colors.border")};

    &::placeholder {
      color: ${themeGet("colors.dark")};
    }

    &:focus {
      border-color: ${themeGet("colors.highlight")};
      box-shadow: 0 0 0 2px rgba(255, 42, 66, 0.1);
    }

    &:hover {
      border-color: ${themeGet("colors.highlight")};
    }
  }

  .ant-form-item-required::before {
    color: ${themeGet("colors.warning")} !important;
  }
`;

export const DetailWrapper = styled.div`
  height: 100%;
  padding: 24px;
  background-color: ${themeGet("colors.secondary")};
  color: ${themeGet("colors.textColor")};
  overflow-y: auto;
`;

export const AuthorInfoCard = styled.div<RoleProps>`
  background-color: ${themeGet("colors.primary")};
  border: 1px solid ${themeGet("colors.border")};
  border-radius: 8px;
  padding: 24px;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  ${(props) =>
    props.$role === "customer" &&
    css`
      border-color: ${themeGet("colors.highlight")};
      box-shadow: 0 0 10px ${themeGet("colors.highlight")},
        inset 0 0 10px rgba(255, 42, 66, 0.05);
    `}
`;

export const ImageContainer = styled.div<RoleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: ${themeGet("colors.primary")};
  border-radius: 8px;
  border: 1px solid ${themeGet("colors.border")};

  img {
    border-radius: 4px;
    object-fit: cover;
  }

  ${(props) =>
    props.$role === "customer" &&
    css`
      border-color: ${themeGet("colors.highlight")};
      box-shadow: 0 0 10px ${themeGet("colors.highlight")};
    `}
`;

export const StyledTitle = styled(Typography.Title)`
  color: ${themeGet("colors.textColor")} !important;
  margin-bottom: 0 !important;
`;

export const StyledText = styled(Typography.Text)`
  color: ${themeGet("colors.textColor")} !important;
  font-size: 1rem;

  &.label {
    color: ${themeGet("colors.highlight")} !important; // Nhãn màu nổi bật
    font-weight: 700;
    margin-right: 8px;
  }
`;
