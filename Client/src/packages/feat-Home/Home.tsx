import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  console.log("Home");
  const handleClick = () => {
    navigate("/test");
  };

  return <>Welcome</>;
};
