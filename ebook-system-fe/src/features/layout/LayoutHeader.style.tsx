import styled from "styled-components";
import { Layout, Menu, Button } from "antd";
import themeGet from "@styled-system/theme-get";
const { Header } = Layout;

export const CustomHeader = styled(Header)`
  height: ${themeGet("headerHeight")}px;
  background-color: ${themeGet("colors.secondary")};
  padding: 0 ${themeGet("spaces.container")}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid ${themeGet("colors.border")};
  z-index: 3;
  position: sticky;
  top: 0;

  .anticon-menu-fold,
  .anticon-menu-unfold {
    font-size: 1.1rem;
    color: ${themeGet("colors.textColor")};
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: ${themeGet("colors.highlight")};
    }
  }
`;

export const HeaderConfirm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonCofirm = styled(Button)`
  margin-right: 1rem;
`;

export const TitleHeader = styled.h2`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
  font-size: 1.5rem;
  color: ${themeGet("colors.textColor")};
  margin: 0;
`;

export const UserInfo = styled.div`
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
`;
export const Avatar = styled.img``;

export const DisplayName = styled.span`
  color: ${themeGet("colors.textColor")};
  margin-right: 0.5rem;
  font-weight: 600;
  /* font-size: 1rem; */
`;

export const CustomMenuItemDropdown = styled(Menu.Item)`
  padding: 10px 40px;
  border-radius: 0 0 5px 5px;
  &:hover {
    background-color: ${themeGet("colors.primary")} !important;
    color: ${themeGet("colors.highlight")} !important;
  }
`;

export const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 1rem;
`;

export const ActionItem = styled(Button)`
  line-height: normal !important;
  margin-right: 1rem;
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid ${themeGet("colors.border")};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;

  span {
    font-size: 1.1rem;
    color: ${themeGet("colors.textColor")};
    transition: all 0.3s;
  }

  &:hover {
    border: 1px solid ${themeGet("colors.highlight")};
    background-color: ${themeGet("colors.primary")};

    span {
      color: ${themeGet("colors.highlight")};
    }
  }
`;

export const DrawerFooterButton = styled(Button)`
  width: calc(50% - 12px);
  /* margin-left: 10px; */
`;

export const ButtonCancel = styled(Button)`
  width: 45%;
  /* margin-left: 10px; */
`;

export const ButtonSubmit = styled(Button)`
  width: 45%;
  /* margin-left: 10px; */
`;

export const SelectBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & > .ant-select {
    margin-right: 10px;
    color: ${themeGet("colors.textColor")};
  }
  & > .ant-select:first-child {
    margin-left: 10px;
  }
`;
