import PersonAdd from "@mui/icons-material/PersonAdd";
import { Button, Alert, Snackbar, Slide } from "@mui/material";
import { useState } from "react";

function SendFriendRequist(props: { onlyIcon?: boolean; userName: string }) {
  const { onlyIcon, userName } = props;
  const sendFriendRequist = () => "";
  const [open, setOpen] = useState(false);

  const send = () => {
    setOpen(true);
    sendFriendRequist();
  };
  const handelClose = () =>
    setTimeout(() => {
      setOpen(false);
    }, 100);

  return (
    <>
      <Button
        sx={{
          padding: "0",
          textTransform: "lowercase",
        }}
        startIcon={<PersonAdd />}
        size={onlyIcon ? "large" : "small"}
        onClick={() => send()}
      >
        {onlyIcon ? null : "friend requist"}
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handelClose}
        TransitionComponent={Slide}
      >
        <Alert onClose={handelClose} severity="success" sx={{ width: "100%" }}>
          frind requist was sent to {userName}!
        </Alert>
      </Snackbar>
    </>
  );
}

export default SendFriendRequist;
