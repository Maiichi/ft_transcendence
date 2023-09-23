import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../core";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "./authUtils";
import { login } from "./components/authThunk";
import { initializeSocket } from "../../core/socket/socketManager";

const Login = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAuthentication();
  console.log("login rendering", isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      console.log("authenticated");
      // if (!state.socket.isConnected) {
      //   let serverUrl =
      //     process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";
      //   let socket = initializeSocket(serverUrl, state.auth.oken);
      //   dispatch(connectionEstablished(socket));
      // }

      navigate("/");
    }
    const queryParams = new URLSearchParams(window.location.search);
    const secT7Param = queryParams.get("secT7");
    const firstLoginParam = queryParams.get("first_login");
    const isFirstLogin = firstLoginParam === "true" ? true : false;

    if (secT7Param) {
      console.log("firsst");
      dispatch(login({ token: secT7Param, firstLogin: isFirstLogin }));
      // navigate("/");
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    //@TODO Make this dynamic
    window.location.href =
      process.env.REACT_APP_BACKEND_CALLBACK_URL ||
      "http://localhost:5001/api/auth/callback";
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
