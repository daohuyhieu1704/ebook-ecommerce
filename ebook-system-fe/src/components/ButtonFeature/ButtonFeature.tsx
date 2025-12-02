import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row } from "antd";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PATH } from "../../constants/common";
import {
  openDrawerRight,
  selectSelectedRows,
  setIsUpdateForm,
  setSelectedRows,
} from "../../features/layout/layoutSlice";
import {
  selectPermissions,
  selectUserInfo,
} from "../../features/Login/LoginSlice";

import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const ActionButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${themeGet("colors.border")};
  color: ${themeGet("colors.textColor")};

  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover,
  &:focus {
    color: ${themeGet("colors.highlight")} !important;
    border-color: ${themeGet("colors.highlight")} !important;
    background-color: ${themeGet("colors.primary")} !important;
  }
`;

const { confirm } = Modal;

export default function ButtonFeature({
  value,
  item,
  changeHandler,
  onlyDetail = false,
}: any) {
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useAppDispatch();
  const selectedRows = useAppSelector(selectSelectedRows);
  const userInfo = useAppSelector(selectUserInfo);

  const permissions = useAppSelector(selectPermissions);

  const [loadingQuesItem, setLoadingQuesItem] = useState(false);
  const cannotUpdate: string[] = [PATH.CATEGORY_DETAIL];
  const disableMoreInfo: string[] = [];

  const drawerOnOpenUpdate = () => {
    dispatch(setIsUpdateForm(true));
    dispatch(setSelectedRows([item]));
    dispatch(openDrawerRight());
  };

  const moduleName = path.split("/").filter(Boolean).pop();

  const canEdit = permissions.some((slug: string) => {
    const isEditAction = slug.includes("edit") || slug.includes("update");
    const isMatchModule = moduleName ? slug.includes(moduleName) : false;
    return isEditAction && isMatchModule;
  });

  return (
    <Row justify="end" align="middle">
      {cannotUpdate.includes(path) ||
      onlyDetail ||
      !canEdit ||
      (false && path.includes("searchCate")) ? (
        <></>
      ) : (
        <Col>
          <ActionButton
            style={{
              marginLeft: "10px",
            }}
            size="small"
            key={`btn-${item.key}`}
            onClick={drawerOnOpenUpdate}
          >
            <EditOutlined />
          </ActionButton>
        </Col>
      )}

      {!disableMoreInfo.includes(path) && (
        <Col>
          <ActionButton
            style={{
              marginLeft: "10px",
            }}
            size="small"
            key={`btn-${item.key}`}
            onClick={() => {
              changeHandler();
            }}
          >
            <EllipsisOutlined />
          </ActionButton>
        </Col>
      )}
    </Row>
  );
}
