import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Checkbox } from "antd";

export const LoginWrapper = styled.div`
  height: 100vh;
  display: flex;
  // Bỏ overflow: hidden ở đây để tránh lỗi không scroll được trên mobile khi form dài
  // overflow: hidden;
  background-color: ${themeGet("colors.backgroundColor")};

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${themeGet("colors.primary")};
    border-color: ${themeGet("colors.primary")};
  }

  //tablet
  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    height: auto; // Cho phép chiều cao tự động trên mobile
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
  background-color: ${themeGet("colors.backgroundColor")};
  // Ẩn ảnh trên mobile nếu cần không gian, hoặc giữ nguyên tùy design

  img {
    width: 90%;
    object-fit: contain;

    //tablet
    @media only screen and (max-width: 1024px) {
      width: 60%; // Giảm kích thước ảnh trên tablet dọc cho gọn
      margin: 20px 0;
    }
  }

  //tablet
  @media only screen and (max-width: 1024px) {
    flex: 1;
    min-height: 200px; // Đảm bảo ảnh không bị bẹp
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
  background-color: ${themeGet("colors.gray")};
  justify-content: center;
  overflow-y: auto; // Cho phép cuộn nếu form quá dài

  .login-btn {
    .ant-form-item-control-input {
      min-height: unset;
    }
  }

  & > div {
    // --- SỬA ĐỔI QUAN TRỌNG ---
    width: 100%; // Chiếm hết chiều ngang cho phép
    max-width: 460px; // Nhưng không vượt quá 460px
    height: auto; // Chiều cao tự động theo nội dung
    min-height: 460px; // Chiều cao tối thiểu (cho form login đẹp)
    display: flex;
    flex-direction: column;
    justify-content: center;
    // -------------------------

    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    padding: 3rem;
    background-color: ${themeGet("colors.white")};
    border-radius: 10px;
    transition: all 0.3s ease; // Hiệu ứng mượt khi chuyển form

    .ant-input-affix-wrapper,
    .input-username {
      height: 50px;
      background-color: ${themeGet("colors.gray")};
    }
    .ant-input {
      background-color: ${themeGet("colors.gray")};
      &:focus {
        background-color: ${themeGet("colors.gray")};
      }
    }

    //tablet
    @media only screen and (max-width: 1024px) {
      width: 90%; // Rộng hơn một chút trên tablet
      max-width: 500px;
      padding: 2rem;
      min-height: auto; // Trên mobile không cần min-height cứng
    }
  }

  //tablet
  @media only screen and (max-width: 1024px) {
    flex: 5;
    justify-content: center;
    align-items: flex-start; // Căn lên trên để scroll tốt hơn
    padding: 2rem 0; // Thêm padding trên dưới

    // Nếu muốn bo tròn kiểu bottom-sheet
    // border-radius: 35px 35px 0 0;
    // box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 0px 0px inset;
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
  color: ${themeGet("colors.primary")};
  font-weight: 600;
  font-size: 1.8rem; // Set font size rõ ràng

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
  margin-bottom: 1rem; // Thêm khoảng cách
  .ant-checkbox-inner {
  }
`;
