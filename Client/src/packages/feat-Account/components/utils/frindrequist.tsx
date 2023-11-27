import PersonAdd from "@mui/icons-material/PersonAdd";
import { Button, Backdrop, Alert, AlertTitle } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { useState } from "react";

function SendFriendRequist(props: { onlyIcon?: boolean; userName: string }) {
  const { onlyIcon, userName } = props;
  const sendFriendRequist = () => "";
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    sendFriendRequist();
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  return (
    <>
      <Button
        sx={{
          padding: "0",
          textTransform: "lowercase",
        }}
        startIcon={<PersonAdd />}
        size={onlyIcon ? "large" : "small"}
        onClick={() => handleOpen()}
      >
        {onlyIcon ? null : "friend requist"}
      </Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={() => setOpen(false)}
      >
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          frind requist was sent
        </Alert>
      </Backdrop>
    </>
  );
}

export default SendFriendRequist;
