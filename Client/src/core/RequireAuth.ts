import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../packages/feat-Auth/authUtils";
import { useAppSelector } from "./redux";

interface RequireAuthProps {
  children: any;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const isAuthenticated = useAuthentication();
  // console.log(
  //   "RequireAuth Rendering",
  //   children.props.children.type.name,
  //   isAuthenticated
  // );
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

  // Render the wrapped content if authenticated
  return isAuthenticated ? children.element : null;
};

export default RequireAuth;
