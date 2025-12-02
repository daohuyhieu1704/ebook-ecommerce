import styled from "styled-components";
import { Layout, Menu } from "antd";
import { themeGet } from "@styled-system/theme-get";
const { Content, Sider, Header } = Layout;

export const LayoutWrapper = styled.div`
  min-width: 1024px;
  background: ${themeGet("colors.backgroundColor")};
`;

export const CustomLayout = styled(Layout)`
  background: ${themeGet("colors.backgroundColor")};
`;

export const CustomContent = styled(Content)`
  padding: ${themeGet("spaces.container")}px;
  min-height: calc(100vh - ${themeGet("headerHeight")}px);
`;

export const CustomMenu = styled(Menu)`
  background-color: ${themeGet("colors.secondary")} !important;
  height: calc(100% - ${themeGet("headerHeight")}px);
  position: relative;
  border-right: none;

  .ant-menu-item-selected {
    background-color: ${themeGet("colors.highlight")} !important;
    color: ${themeGet("colors.white")} !important;
  }

  .ant-menu-item {
    color: ${themeGet("colors.textColor")};
    &:hover {
      color: ${themeGet("colors.highlight")};
    }
  }
`;

export const CustomMenuItem = styled(Menu.Item)`
  font-size: ${themeGet("sizes.S")};
  margin-top: 0 !important;
`;

export const CustomSider = styled(Sider)`
  background-color: ${themeGet("colors.secondary")} !important;

  .ant-menu.ant-menu-dark,
  .ant-menu-dark .ant-menu-sub,
  .ant-menu.ant-menu-dark .ant-menu-sub {
    background-color: ${themeGet("colors.secondary")} !important;
  }
`;

export const CustomHeader = styled(Header)`
  height: ${themeGet("headerHeight")}px;
  background-color: ${themeGet("colors.secondary")};
  padding: 0 ${themeGet("spaces.container")}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid ${themeGet("colors.border")};
  z-index: 1;
  position: relative;

  & > span {
    color: ${themeGet("colors.textColor")};
    font-size: 1.1rem;
  }
`;

export const CategoryTitle = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  color: ${themeGet("colors.textColor")};
  width: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

export const CustomMenuItemDropdown = styled(Menu.Item)`
  padding: 10px 30px;
`;

export const LogoWrapper = styled.div`
  height: ${themeGet("headerHeight")}px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  padding-left: 24px;

  img {
    width: 40px;
    height: 40px;
    margin-right: 0.5rem;
    object-fit: contain;
  }
  span {
    font-size: 1.3rem;
  }
`;

export const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 0.5rem;
  object-fit: contain;
`;

export const LogoText = styled.p`
  color: ${themeGet("colors.textColor")};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
  font-weight: 700;
  font-size: ${themeGet("sizes.Standard")};
  margin-left: 10px;
  font-size: 1.3rem;
`;

export const LogoPara = styled.p`
  color: ${themeGet("colors.textColor")};
  display: flex;
  align-items: center;
  margin-bottom: 0;
  font-weight: 700;
  font-size: ${themeGet("sizes.Standard")};
  margin-left: 10px;
  font-size: 0.6rem;
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
`;

export const ImageContent = styled.div`
  padding: 5px;
  height: ${themeGet("headerHeight")}px;
  text-align: center;
  & > img {
    width: 40px;
    height: 100%;
    object-fit: contain;
  }
`;

export const Container = styled.div`
  .ant-input,
  .ant-input-search-button {
    background-color: ${themeGet("colors.gray")};
    border: 0;
    height: 35px;
    color: ${themeGet("colors.textColor")};
    box-shadow: none;

    &::placeholder {
      color: ${themeGet("colors.dark")};
    }

    &:focus {
      border: 1px solid ${themeGet("colors.highlight")};
    }
    &:hover {
      border: 0;
    }
  }
  .anticon,
  .anticon-search {
    color: ${themeGet("colors.textColor")};
  }
`;

export const ContainerSearch = styled.div`
  padding: 0 10px 5px 10px;
  margin: 5px 0;
`;

export const ButtonSendMail = styled.button`
  background-color: ${themeGet("colors.highlight")};
  color: ${themeGet("colors.white")};
  text-align: center;
  width: 150px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    opacity: 0.8;
  }
`;
