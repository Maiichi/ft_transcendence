import { Box, Modal } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import styled from "styled-components";
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
      }}
      aria-labelledby="modal-search-invite-users-to-room"
      aria-describedby="modal-description"
    >
      <StyledBox>
        {closeType && closeType == "click" && (
          <CancelIcon onClick={handleClose} />
        )}
        {ChildComponent}
      </StyledBox>
    </Modal>
  );
};

const StyledBox = styled(Box)`
  position: absolute;
  width: 350px;
  top: 20%;
  left: 40%;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(0, 0, 0);
  border-radius: 5px;
  overflow: hidden;
  padding: 10px;
  @media (max-width: 426px) {
    width: 80%;
    left: 6%;
  }
`;
