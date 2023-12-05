import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../core";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isFirstLogin = useAppSelector((state) => state.auth.token);

  console.log("Home", isFirstLogin);

  return <>Welcome</>;
};
