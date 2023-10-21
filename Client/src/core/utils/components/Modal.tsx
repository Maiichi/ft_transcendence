import { Box, Modal } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
export interface Props {
  open: boolean;
  ChildComponent: JSX.Element;
  handleClose: () => void;
  closeType?: "auto" | "click";
}

export const ModalComponent = (props: Props) => {
  const { closeType, ChildComponent, handleClose, open } = props;

  return (
    <Modal
      open={open}
      onClose={() => {
        if (closeType === "auto") {
          handleClose();
        }
        // You can add additional logic here based on the 'reason' parameter if needed.
      }}
      aria-labelledby="modal-search-invite-users-to-room"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        {closeType && closeType == "click" && (
          <CancelIcon onClick={handleClose} />
        )}
        {ChildComponent}
      </Box>
    </Modal>
  );
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
  overflow: "hidden",
};
