import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthentication } from "../packages/feat-Auth/authUtils";
import { useAppSelector } from "./redux";
import { Route } from "./routes";

interface RequireAuthProps {
  children: Route;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthentication();
  const { pathname } = useLocation();
  const [Go, letgo] = useState(false);
  const authState = useAppSelector((state) => state.auth);
  const isFirstLogin = authState.firstLogin;

  React.useEffect(() => {
    if (!isAuthenticated) {
      children.path === "/" ? navigate("/overView") : navigate("/login");
    } else if (isFirstLogin) {
      navigate("/firstlogin");
    } else if (authState.shouldVerifyTwoFactor) {
      navigate("/verifyOtp");
    }
  }, [isAuthenticated, pathname]);
  useEffect(() => {
    letgo(true);
  }, []);

  // Render the wrapped content if authenticated
  if (!Go) return null;
  return isAuthenticated ? children.element : null;
};

export default RequireAuth;
