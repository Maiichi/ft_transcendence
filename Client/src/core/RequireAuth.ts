import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../packages/feat-Auth/authUtils";
import { useAppDispatch, useAppSelector } from "./redux";
import { ConnectSocket } from "../packages";

interface RequireAuthProps {
  children: React.ReactElement;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const isAuthenticated = useAuthentication();
  // console.log(
  //   "RequireAuth Rendering",
  //   children.props.children.type.name,
  //   isAuthenticated
  // );
  const navigate = useNavigate();
  const isFirstLogin = useAppSelector((state) => state.auth.firstLogin);
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    if (isFirstLogin) {
      navigate("/firstlogin");
    }
  }, [isAuthenticated]);

  // Render the wrapped content if authenticated
  return children;
};

export default RequireAuth;
