import styled, { css } from "styled-components";
import { Card, Divider, Form } from "antd";
import { themeGet } from "@styled-system/theme-get";

interface StyledProps {
  $role?: string;
}

export const CustomDivider = styled(Divider)`
  color: ${themeGet("colors.textColor")} !important;
  font-weight: 600;

  &::before,
  &::after {
    border-top: 1px solid ${themeGet("colors.border")} !important;
  }
`;

export const CustomCard = styled(Card)<StyledProps>`
  background-color: ${themeGet("colors.secondary")} !important;
  border: 1px solid ${themeGet("colors.border")} !important;
  cursor: pointer;
  transition: all 0.4s ease-in-out;

  .ant-card-body {
    color: ${themeGet("colors.textColor")};
    transition: all 0.3s;
  }

  h5.ant-typography {
    color: ${themeGet("colors.textColor")} !important;
    transition: all 0.3s;
  }

  &:hover {
    transform: translateY(-5px);

    border-color: ${themeGet("colors.highlight")} !important;
    h5.ant-typography {
      color: ${themeGet("colors.highlight")} !important;
    }

    ${(props) =>
      props.$role === "customer" &&
      css`
        border-color: ${themeGet("colors.highlight")} !important;
        box-shadow: 0 0 5px ${themeGet("colors.highlight")},
          0 0 20px ${themeGet("colors.highlight")},
          0 0 40px ${themeGet("colors.highlight")} !important;

        h5.ant-typography,
        .ant-card-body {
          color: ${themeGet("colors.white")} !important;
          text-shadow: 0 0 10px ${themeGet("colors.highlight")};
        }
      `}
  }
`;

export const CategoryContainer = styled.div`
  padding-bottom: 2rem;
`;

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

    &:focus,
    &:hover {
      border-color: ${themeGet("colors.highlight")};
    }

    &[disabled] {
      background-color: ${themeGet("colors.primary")} !important;
      color: ${themeGet("colors.dark")} !important;
    }
  }

  .ant-form-item-required::before {
    color: ${themeGet("colors.warning")} !important;
  }
`;
