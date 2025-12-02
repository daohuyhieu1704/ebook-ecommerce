import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const LoginWrapper = styled.div`
  height: 100vh;
  display: flex;
  background-color: ${themeGet("colors.backgroundColor")}; // Nền chính (tối)

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${themeGet("colors.highlight")}; // Màu nhấn nổi bật
    border-color: ${themeGet("colors.highlight")};
  }
  .ant-checkbox-wrapper .ant-checkbox-inner {
    border-color: ${themeGet("colors.border")}; // Viền checkbox màu tối
  }

  //tablet
  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }

  //tablet landspace
  @media only screen and (max-width: 1024px) and (max-height: 768px) {
    flex-direction: row;
    height: 100vh;
  }
`;

export const ImgContent = styled.div`
  flex: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${themeGet("colors.backgroundColor")}; // Giữ nền tối

  img {
    width: 90%;
    object-fit: contain;

    //tablet
    @media only screen and (max-width: 1024px) {
      width: 60%;
      margin: 20px 0;
    }
  }

  //tablet
  @media only screen and (max-width: 1024px) {
    flex: 1;
    min-height: 200px;
  }

  //tablet landspace
  @media only screen and (max-width: 1024px) and (max-height: 768px) {
    flex: 1;
  }
`;

export const LoginFormWrapper = styled.div`
  flex: 2;
  padding: 2rem;
  display: flex;
  align-items: center;
  background-color: ${themeGet(
    "colors.gray"
  )}; // Nền form wrapper (xám đậm hơn)
  justify-content: center;
  overflow-y: auto;

  .login-btn {
    .ant-form-item-control-input {
      min-height: unset;
    }
  }

  & > div {
    width: 100%;
    max-width: 460px;
    height: auto;
    min-height: 460px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    box-shadow: rgba(255, 255, 255, 0.08) 0px 3px 8px;
    padding: 3rem;
    background-color: ${themeGet("colors.secondary")};
    border-radius: 10px;
    transition: all 0.3s ease;

    // Input trong Ant Design
    .ant-input-affix-wrapper,
    .input-username {
      height: 50px;
      background-color: ${themeGet("colors.gray")};
      color: ${themeGet("colors.textColor")};
    }
    .ant-input {
      // Màu nền input
      background-color: ${themeGet("colors.gray")};
      color: ${themeGet("colors.textColor")};
      &::placeholder {
        color: ${themeGet("colors.dark")};
      }
      &:focus {
        background-color: ${themeGet("colors.gray")};
      }
    }
    .ant-input-affix-wrapper > .ant-input-suffix > .anticon-eye {
      color: ${themeGet("colors.textColor")};
    }
    }
    .ant-input-affix-wrapper > .ant-input-suffix > .anticon-eye-invisible {
      color: ${themeGet("colors.textColor")};
    }

    .ant-input-suffix,
    .ant-input-prefix {
      color: ${themeGet("colors.white")} !important;
    }
    .ant-input-status-error:not(.ant-input-disabled):not(
        .ant-input-borderless
      ).ant-input,
    .ant-input-status-error:not(.ant-input-disabled):not(
        .ant-input-borderless
      ).ant-input:hover {
      background-color: ${themeGet("colors.gray")};
    }

    .ant-input-affix-wrapper-status-error:not(
        .ant-input-affix-wrapper-disabled
      ):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper,
    .ant-input-affix-wrapper-status-error:not(
        .ant-input-affix-wrapper-disabled
      ):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper:hover {
      background-color: ${themeGet("colors.gray")};
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      // Dùng shadow đổ vào trong để che màu trắng mặc định
      -webkit-box-shadow: 0 0 0 30px ${themeGet(
        "colors.gray"
      )} inset !important;
      // Chỉnh màu chữ thành màu sáng
      -webkit-text-fill-color: ${themeGet("colors.textColor")} !important;
      transition: background-color 5000s ease-in-out 0s;
    }

    .ant-input-prefix,
    .ant-input-suffix {
      color: ${themeGet("colors.dark")};
    }

    .ant-radio-button-wrapper {
      background-color: ${themeGet("colors.gray")};
      color: ${themeGet("colors.textColor")};
      border-color: ${themeGet("colors.dark")} !important;
      
      &:hover {
        color: ${themeGet("colors.highlight")};
      }
    }

    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
      background-color: ${themeGet("colors.highlight")} !important;
      color: ${themeGet("colors.white")} !important;
      border-color: ${themeGet("colors.highlight")} !important;
      
      &:hover {
        background-color: ${themeGet("colors.highlight")} !important;
        color: ${themeGet("colors.white")} !important;
      }
    }

    //tablet
    @media only screen and (max-width: 1024px) {
      width: 90%;
      max-width: 500px;
      padding: 2rem;
      min-height: auto;
    }
  }

  //tablet
  @media only screen and (max-width: 1024px) {
    flex: 5;
    justify-content: center;
    align-items: flex-start;
    padding: 2rem 0;
  }

  //tablet landspace
  @media only screen and (max-width: 1024px) and (max-height: 768px) {
    flex: 1;
    border-radius: 0;
    align-items: center;
  }
`;

export const LoginFormTitle = styled.h1`
  width: 100%;
  margin: auto;
  margin-bottom: 2rem;
  text-align: center;
  color: ${themeGet("colors.textColor")}; // Màu chữ sáng
  font-weight: 600;
  font-size: 1.8rem;

  //tablet
  @media only screen and (max-width: 1024px) {
    text-align: center;
    margin-bottom: 1.5rem;
    font-weight: 700;
  }
`;

export const ReForgotPass = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  // Màu chữ cho các liên kết/label (ví dụ: Quên mật khẩu, Ghi nhớ)
  color: ${themeGet("colors.textColor")};
`;
