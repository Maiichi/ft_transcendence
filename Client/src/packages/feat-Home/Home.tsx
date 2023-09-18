import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../core";
import { StartSocketConnection } from "../../core/socket/socketThunk";
import { SocketConnected, SocketTest } from "../feat-Chat";

export const Home = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isFirstLogin = useAppSelector((state) => state.auth.token);

    console.log("Home", isFirstLogin);
    dispatch(SocketTest());
    const handleClick = () => {
        navigate("/test");
    };

    return <>Welcome</>;
};
