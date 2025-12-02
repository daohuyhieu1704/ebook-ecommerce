import {
  Col,
  Row,
  Typography,
  // Bỏ import Card, Divider gốc của antd ở đây
} from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { NotificationCustom } from "../../components/NotificationCustom/NotificationCustom";
import {
  selectIsRefetch,
  selectSelectedKey,
  setIsRefetch,
} from "../layout/layoutSlice";
import { CategoryAPI } from "../../api/CategoryAPI";
import { selectAccessToken, selectUserInfo } from "../Login/LoginSlice"; // Bỏ selectUserInfo nếu không dùng
import {
  selectCategoryData,
  setCategoryData,
  setSearchCate,
} from "./CategorySlice";

import { CategoryContainer, CustomCard, CustomDivider } from "./Category.style";

export default function Category() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [label, setLabel] = useState<any>([]);
  const [cateList, setCateList] = useState<any>([]);

  const isRefetch = useAppSelector(selectIsRefetch);
  const selectedTab = useAppSelector(selectSelectedKey);
  const data = useAppSelector(selectCategoryData);
  const userInfo = useAppSelector(selectUserInfo);
  const userRole = userInfo?.role_id || "customer";
  const accessToken = useAppSelector(selectAccessToken);

  const onSuccess = (data: any) => {
    setLoading(false);
    NotificationCustom({
      type: "success",
      message: "Thành công",
      description: `${data.message}`,
    });
    dispatch(
      setCategoryData(
        data.data.reverse().map((data: any, index: number) => ({
          key: data.id,
          STT: index + 1,
          ...data,
        }))
      )
    );
  };
  const onError = (err: any) => {
    setLoading(false);
    NotificationCustom({
      type: "error",
      message: "Error",
      description: err.data?.message,
    });
  };
  function handleClickRoom(id_category: string) {
    dispatch(setSearchCate(id_category));
    console.log(id_category);
    navigate(`/category/${id_category}`, { replace: false });
  }
  const getData = () => {
    CategoryAPI.getAllCategories(accessToken)
      .then(({ data }) => {
        if (data.code !== 200) {
          throw new Error(data.message);
        }
        const cateData = data.data;
        console.log("res", cateData);
        cateData.sort((a: any, b: any) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        const SetOfLabel = new Set(
          cateData.map((item: any) => item.name.substring(0, 1))
        );
        setCateList(cateData);
        setLabel(Array.from(SetOfLabel));
        onSuccess(data);
      })
      .catch((err) => {
        onError(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (isRefetch && location.pathname === selectedTab) {
      getData();
      dispatch(setIsRefetch(false));
    }
  }, [isRefetch]);

  return (
    <CategoryContainer>
      {label.map((item: string) => (
        <div key={item}>
          <CustomDivider orientation="left">{item}</CustomDivider>
          <Row gutter={16} key={item}>
            {cateList
              .filter((x: any) => x.name.substring(0, 1) === item)
              .reverse()
              .map((cate: any) => (
                <Col
                  key={cate.id}
                  className="gutter-row"
                  span={6}
                  style={{ marginTop: "1rem" }}
                >
                  <CustomCard
                    $role={userRole}
                    hoverable
                    key={cate.id}
                    onClick={() => handleClickRoom(cate.id)}
                  >
                    <Typography.Title level={5}>{cate.name}</Typography.Title>
                    <div style={{ opacity: 0.8 }}>{cate.description}</div>
                  </CustomCard>
                </Col>
              ))}
          </Row>
        </div>
      ))}
    </CategoryContainer>
  );
}
