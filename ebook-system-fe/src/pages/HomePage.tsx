import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { PATH } from "../constants/common";
import { selectUserInfo, selectRole } from "../features/Login/LoginSlice";
const HomePage = () => {
  const navigate = useNavigate();
  const currentRoleId = useAppSelector(selectRole);

  useEffect(() => {
    switch (userInfo?.role_id) {
      case "1":
        navigate(PATH.EMPLOYEES);
        break;
      case "2":
        navigate(PATH.BOOK);
        break;
    }
  }, []);
  return <></>;
};

export default HomePage;
