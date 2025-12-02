import styled from "styled-components";
import { Form } from "antd";
import { themeGet } from "@styled-system/theme-get";

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
