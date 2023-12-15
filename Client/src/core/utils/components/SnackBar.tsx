import { Alert, AlertColor, Snackbar } from "@mui/material";

interface Props {
  msgError: string;
  open: boolean;
  severity: AlertColor;
  handleClose: any;
}

export const SnackBarComponent = ({
  handleClose,
  msgError,
  severity,
  open,
}: Props) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      key={"top" + "center"}
    >
      <Alert onClose={handleClose} severity={severity} sx={style}>
        {msgError}
      </Alert>
    </Snackbar>
  );
};
const style = {
  width: "100%",
};
