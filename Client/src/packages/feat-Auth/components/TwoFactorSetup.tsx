import { forwardRef, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import {
  Box,
  Button,
  FormControlLabel,
  Skeleton,
  Switch,
  TextField,
} from "@mui/material";
import { apiRequest } from "../../../core/utils/apiRequest";
import { useAppDispatch, useAppSelector } from "../../../core";
import OtpInput from "./OtpInput";
import { disableTwoFactor } from "./authThunk";
import { enableTwoFactor } from "./authThunk";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog: React.FC<any> = ({ open, setOpen, action }) => {
  const [qrCode, setQrCode] = useState(null);

  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setOpen(false);
  };

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
        setOpen(false);
        if (action === "ENABLE")
          dispatch(enableTwoFactor({ token: authState.token }));
        else dispatch(disableTwoFactor({ token: authState.token }));
      } else {
        setVerifyError("Invalid code");
      }
    } catch (error) {
      console.log("Error verifying code", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiRequest(`/auth/2fa/generate`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });
        setQrCode(response.url);
      } catch (err) {
        console.log("error in qr generation", err);
      }
    }
    action === "ENABLE" && fetchData();
  }, []);

  // const enable2FA = async () => {};
  // const disable2FA = async () => {};

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }} color="secondary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{
              ml: 2,
              flex: 1,
            }}
            variant="h6"
            component="div"
          >
            {(action === "ENABLE" ? "Enable " : "Disable ") +
              "Two-Factor Authentication (2FA)"}
          </Typography>
          {/* <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button> */}
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        {action === "ENABLE" && (
          <>
            <Typography gutterBottom variant="h5" component="div">
              Scan the QR code
            </Typography>
            {qrCode ? (
              <Box
                component="img"
                width="200"
                //   borderRadius={onFin === qrc ? "1rem" : 0}
                src={qrCode}
                alt="qrCode-result"
              ></Box>
            ) : (
              <Skeleton
                sx={{ bgcolor: "grey.900" }}
                variant="rectangular"
                width={200}
                height={200}
              />
            )}
          </>
        )}
        <Typography gutterBottom variant="h5" component="div">
          Verify Code
        </Typography>
        <OtpInput
          onChange={handleOtpChange}
          error={!!verifyError}
          errorMessage={verifyError}
        />
        <Button
          style={{ marginTop: "10px", textAlign: "center" }}
          type="submit"
          variant="contained"
          color="secondary"
          onClick={handleOtpSubmit}
          disabled={otpCode.length != 6}
        >
          Verify
        </Button>
      </Box>
    </Dialog>
  );
};

interface Props {
  twoFactorActivate: boolean;
}

const TwoFactorSetup: React.FC<Props> = ({ twoFactorActivate }) => {
  const [open, setOpen] = useState(false);

  const handle2FA = (value: boolean) => {
    setOpen(true);
  };

  return (
    <>
      <FormControlLabel
        control={
          <Switch
            color="secondary"
            checked={twoFactorActivate}
            // defaultChecked={twoFactorActivate}
            onChange={(e) => {
              handle2FA(e.target.checked);
            }}
          />
        }
        label={twoFactorActivate ? "Disable 2FA" : "Enable 2FA"}
      />
      {open && (
        <FullScreenDialog
          open={open}
          setOpen={setOpen}
          action={twoFactorActivate ? "DISABLE" : "ENABLE"}
        />
      )}
    </>
  );
};

export default TwoFactorSetup;
