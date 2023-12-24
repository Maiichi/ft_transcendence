import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../packages/feat-Auth/authUtils";
import { useAppSelector } from "./redux";
import { Route } from "./routes";
import { Backdrop } from "@mui/material";

interface RequireAuthProps {
  children: Route;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const isAuthenticated = useAuthentication();
  // console.log(
  //   "RequireAuth Rendering",
  //   children.props.children.type.name,
  //   isAuthenticated
  // );
  const [Go, letgo] = useState(false);
  const navigate = useNavigate();
  const authState = useAppSelector((state) => state.auth);
  const isFirstLogin = authState.firstLogin;
  React.useEffect(() => {
    if (!isAuthenticated) {
      children.path === "/" ? navigate("/overView") : navigate("/login");
    }
    if (isFirstLogin) {
      navigate("/firstlogin");
    }
    if (authState.shouldVerifyTwoFactor) {
      navigate("/verifyOtp");
    }
  }, [isAuthenticated]);
  useEffect(() => { letgo(true) }, [])
  
  // Render the wrapped content if authenticated
  if (!Go) return null;
  return isAuthenticated ? children.element : null;
};

export default RequireAuth;
