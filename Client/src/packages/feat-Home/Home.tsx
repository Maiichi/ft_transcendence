import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/test");
  };

  return (
    <>
      <button onClick={handleClick}>sss</button>
    </>
  );
};
