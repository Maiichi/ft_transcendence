import { useEffect, useState } from "react";
import { useAppDispatch } from "../../core";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "./authUtils";
import { login } from "./components/authThunk";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { purple } from "@mui/material/colors";

const Login = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAuthentication();
  const navigate = useNavigate();
  const [start, goStart] = useState(false);

  useEffect(() => {
    goStart(true);
  }, []);
  useEffect(() => {
    isAuthenticated && navigate("/");

    const queryParams = new URLSearchParams(window.location.search);
    const secT7Param = queryParams.get("secT7");
    const firstLoginParam = queryParams.get("first_login");
    const isFirstLogin = firstLoginParam === "true" ? true : false;

    if (secT7Param) {
      dispatch(
        login({
          token: secT7Param,
          firstLogin: isFirstLogin,
          user: null,
        })
      );
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
  if (isAuthenticated || !start)
    return <Backdrop color={purple[50]} open={true}></Backdrop>;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: `5px 20px 20px 10px ${purple[100]}`,
        }}
      >
        <h2>Login with 42 Intra</h2>
        <p>Click the button below to authenticate using 42 Intra.</p>
        <Button
          onClick={() => handleLogin()}
          color="secondary"
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
    </div>
  );
};

export default Login;
