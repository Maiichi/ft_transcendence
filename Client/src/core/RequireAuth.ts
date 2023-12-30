import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../packages/feat-Auth/authUtils";
import { useAppSelector } from "./redux";
import { Route } from "./routes";
import { useLocation } from "react-router-dom";

interface RequireAuthProps {
  children: Route;
}

export const Public: React.FC<RequireAuthProps> = ({ children }) => {
  const isAuthenticated = useAuthentication();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else setLoading(true);
  }, [isAuthenticated]);

  return loading ? children.element : null;
};

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const isAuthenticated = useAuthentication();
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const authState = useAppSelector((state) => state.auth);
  const [loading, setLoading] = React.useState(false);

  const isFirstLogin = authState.firstLogin;
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/overView");
    } else {
      if (isFirstLogin) {
        navigate("/firstlogin");
      } else if (children.path === "/firstlogin") {
        navigate("/");
      }
      if (authState.shouldVerifyTwoFactor) {
        navigate("/verifyOtp");
      } else if (children.path === "/verifyOtp") {
        navigate("/");
      }
    }

    setLoading(true);
  }, [isAuthenticated, pathname, isFirstLogin]);

  return loading ? children.element : null;
};

export default RequireAuth;
