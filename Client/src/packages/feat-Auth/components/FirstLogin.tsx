import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../core";
import { setFirstLogin } from "./authSlice";

const FirstLogin = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const account = useAppSelector((state) => state.auth.user);
    const handleSubmit = () => {
        dispatch(setFirstLogin(false));
        navigate("/");
    };
    return (
        <div>
            <p>form will be available soon</p>
            <p>{`Hi ${account.firstName}`}</p>
            <button onClick={handleSubmit}>Go to homepage</button>
        </div>
    );
};

export default FirstLogin;
