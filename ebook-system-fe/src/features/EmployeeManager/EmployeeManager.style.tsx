import styled from "styled-components";
import { Form } from "antd";
import { themeGet } from "@styled-system/theme-get";

export const FormCustom = styled(Form)`
  // 1. Label màu trắng
  .ant-form-item-label > label {
    color: ${themeGet("colors.textColor")} !important;
  }

  // 2. Input và Input Password
  .ant-input,
  .ant-input-password {
    background-color: ${themeGet("colors.gray")} !important;
    color: ${themeGet("colors.textColor")} !important;
    border: 1px solid ${themeGet("colors.border")};

    &::placeholder {
      color: ${themeGet("colors.dark")};
    }

    &:focus,
    &:hover,
    &-focused {
      border-color: ${themeGet("colors.highlight")};
    }

    // Icon trong password input
    .ant-input-suffix {
      color: ${themeGet("colors.textColor")};
    }
  }

  .ant-picker {
    background-color: ${themeGet("colors.gray")} !important;
    border: 1px solid ${themeGet("colors.border")};

    .ant-picker-input > input {
      color: ${themeGet("colors.textColor")} !important;
    }

    .ant-picker-suffix {
      color: ${themeGet("colors.textColor")};
    }

    &:hover,
    &-focused {
      border-color: ${themeGet("colors.highlight")};
    }
  }

  .ant-switch-checked {
    background-color: ${themeGet("colors.highlight")};
  }

  .ant-form-item-required::before {
    color: ${themeGet("colors.warning")} !important;
  }

  .ant-select {
    width: 100%;

    .ant-select-selector {
      background-color: ${themeGet("colors.gray")} !important;
      color: ${themeGet("colors.textColor")} !important;
      border: 1px solid ${themeGet("colors.border")} !important;
    }

    .ant-select-arrow {
      color: ${themeGet("colors.textColor")};
    }

    &:hover .ant-select-selector,
    &-focused .ant-select-selector {
      border-color: ${themeGet("colors.highlight")} !important;
    }
  }

  .ant-select-dropdown {
    background-color: ${themeGet("colors.secondary")} !important;
    border: 1px solid ${themeGet("colors.border")};

    .ant-select-item {
      color: ${themeGet("colors.textColor")};

      &-option-selected {
        background-color: ${themeGet("colors.highlight")} !important;
        color: ${themeGet("colors.white")} !important;
      }

      &-option-active {
        background-color: ${themeGet("colors.primary")} !important;
      }
    }
  }
`;
