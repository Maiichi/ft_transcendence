import { Button, Typography } from "@mui/material";
import OtpInput from "../packages/feat-Auth/components/OtpInput";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux";
import { useState } from "react";
import { apiRequest } from "./utils/apiRequest";
import { setShouldVerifyTwoFactor } from "../packages/feat-Auth/components/authSlice";

const VerifyOtp: React.FC<any> = ({ open, setOpen, action }) => {
    const authState = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [otpCode, setOtpCode] = useState("");
    const [verifyError, setVerifyError] = useState("");
    // Callback function to handle OTP code changes
    const handleOtpChange = (code: string) => {
        setVerifyError("");
        setOtpCode(code);
    };
    const handleOtpSubmit = async () => {
        try {
            const response = await apiRequest(`/auth/2fa/verify`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authState.token}`,
                },
                data: { code: otpCode },
            });

            if (response) {
                dispatch(setShouldVerifyTwoFactor(false));
                navigate("/");
            } else {
                setVerifyError("Invalid code");
            }
        } catch (error) {
            console.log("Error verifying code", error);
        }
    };

    return (
        <>
            <Typography gutterBottom variant="h5" component="div">
                Verify Code
            </Typography>
            <OtpInput
                onChange={handleOtpChange}
                error={!!verifyError}
                errorMessage={verifyError}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleOtpSubmit}
                disabled={otpCode.length != 6}
            >
                Verify
            </Button>
        </>
    );
};

export default VerifyOtp;
