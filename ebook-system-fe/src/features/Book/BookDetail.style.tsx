import styled, { css } from "styled-components";
import { Typography, Divider } from "antd";
import { themeGet } from "@styled-system/theme-get";

interface RoleProps {
  $role?: string;
}

export const DetailWrapper = styled.div`
  height: 100%;
  padding: 24px;
  background-color: ${themeGet("colors.secondary")};
  color: ${themeGet("colors.textColor")};
  overflow-y: auto;
`;

export const LeftInfoColumn = styled.div<RoleProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  background-color: ${themeGet("colors.primary")};
  border: 1px solid ${themeGet("colors.border")};
  transition: all 0.3s ease;
  height: 100%;

  ${(props) =>
    props.$role === "customer" &&
    css`
      border-color: ${themeGet("colors.highlight")};
      box-shadow: 0 0 10px ${themeGet("colors.highlight")},
        inset 0 0 15px rgba(255, 42, 66, 0.1);

      .ant-avatar {
        background-color: ${themeGet("colors.highlight")};
        box-shadow: 0 0 15px ${themeGet("colors.highlight")};
      }
    `}
`;

export const StyledText = styled(Typography.Text)`
  color: ${themeGet("colors.textColor")} !important;

  &.strong {
    font-weight: 700;
    color: ${themeGet("colors.highlight")} !important;
  }
`;

export const StyledTitle = styled(Typography.Title)`
  color: ${themeGet("colors.textColor")} !important;
  margin-bottom: 0 !important;
`;

export const StyledDivider = styled(Divider)`
  border-color: ${themeGet("colors.border")} !important;

  &.ant-divider-vertical {
    height: 100%;
    border-left: 1px solid ${themeGet("colors.border")};
  }
`;

export const AuthorImageWrapper = styled.div<RoleProps>`
  border: 2px solid ${themeGet("colors.border")};
  border-radius: 8px;
  overflow: hidden;

  ${(props) =>
    props.$role === "customer" &&
    css`
      border-color: ${themeGet("colors.highlight")};
      box-shadow: 0 0 10px ${themeGet("colors.highlight")};
    `}
`;
