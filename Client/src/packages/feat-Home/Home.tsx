import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../core";

export const Home = () => {
  const navigate = useNavigate();
  const isFirstLogin = useAppSelector((state) => state.auth.token);

  console.log("Home", isFirstLogin);
  const handleClick = () => {
    navigate("/test");
  };

  return <>Welcome</>;
};
