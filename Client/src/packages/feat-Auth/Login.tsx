import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../core";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "./authUtils";
import { login } from "./components/authThunk";
import { initializeSocket } from "../../core/socket/socketManager";
import { Backdrop, Button, CircularProgress } from "@mui/material";

const Login = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAuthentication();
  const navigate = useNavigate();
  const [start, goStart] = useState(false);

  useEffect(() => {
    goStart(true);
  }, []);
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
      dispatch(
        login({
          token: secT7Param,
          firstLogin: isFirstLogin,
          user: null,
        })
      );
      // navigate("/");
    }
  }, [isAuthenticated]);

  const [open, setOpen] = useState(false);
  const handleLogin = () => {
    //@TODO Make this dynamic
    setOpen(true);
    window.location.href =
      process.env.REACT_APP_BACKEND_CALLBACK_URL ||
      "http://localhost:5001/api/auth/callback";
  };
  if (isAuthenticated || !start) return <Backdrop color="#b8b0b0" open={true}></Backdrop>;
  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "#ffffff",
      }}
    >
      <h2>Login with 42 Intra</h2>
      <p>Click the button below to authenticate using 42 Intra.</p>
      <Button
        onClick={() => handleLogin()}
        variant="contained"
        sx={{
          p: "10px 20px",
          bottom: -5,
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Login
      </Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Login;
