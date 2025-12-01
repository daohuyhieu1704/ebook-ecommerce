import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectUserInfo } from "../features/Login/LoginSlice";

const HomePage = () => {
  const navigate = useNavigate();
  const userInfo = useAppSelector(selectUserInfo);

  useEffect(() => {
    if (userInfo?.start_url) {
      console.log("Navigating to:", userInfo.start_url);
      navigate(userInfo.start_url, { replace: true });
      return;
    }
  }, [userInfo, navigate]);

  return <></>;
};

export default HomePage;
