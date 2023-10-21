import { Box, Modal } from "@mui/material";
import styled from "styled-components";
import { leaveRoom } from "../redux/roomSlice";
import { useAppDispatch } from "../../../../core";
import { useState } from "react";
import { I_Room } from "../../Types/types";
import { LogoutRounded } from "@mui/icons-material";

export const LeaveRoomModal = (props: { channelConversation: I_Room }) => {
  const { channelConversation } = props;
  const dispatch = useAppDispatch();
  const [openLeaveModal, setOpenLeaveModal] = useState(false);

  const openLeaveRoomModal = () => {
    setOpenLeaveModal(true);
  };

  const closeLeaveRoomModal = () => {
    setOpenLeaveModal(!openLeaveModal);
  };

  const handleLeaveRoom = () => {
    console.log("channelId || ", channelConversation.id);
    dispatch(leaveRoom(channelConversation.id));
    closeLeaveRoomModal();
  };

  return (
    <>
      <LogoutRounded
        onClick={openLeaveRoomModal}
        style={{ cursor: "pointer" }}
      />
      <Modal
        open={openLeaveModal}
        onClose={closeLeaveRoomModal}
        aria-labelledby="modal-search-invite-users-to-room"
        aria-describedby="modal-description"
      >
        <Box sx={boxStyle}>
          <ModalHeader>
            <h3>you want to leave #{channelConversation.name} ?</h3>
            {/* <Close className={"close-button"} style={{cursor: 'pointer'}} onClick={() => setOpen(false)} /> */}
          </ModalHeader>
          <ModalFooter>
            <ButtonCancel onClick={() => setOpenLeaveModal(false)}>
              Cancel
            </ButtonCancel>
            <ButtonLeave onClick={handleLeaveRoom}>Confirm</ButtonLeave>
          </ModalFooter>
        </Box>
      </Modal>
    </>
  );
};

const boxStyle = {
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

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ModalFooter = styled.div`
  margin: 25px 0px 0px 0px;
  display: flex;
  justify-content: space-evenly;
`;
const ButtonLeave = styled.div`
  height: 40px;
  width: 100px;
  border: 10px;
  border-radius: 10px;
  cursor: pointer;
  background: red;
  &:hover {
    background-color: rgb(244, 56, 56);
    color: #f1f1f1;
  }
`;

const ButtonCancel = styled.div`
  height: 40px;
  width: 100px;
  border: 10px;
  border-radius: 10px;
  cursor: pointer;
  background: grey;
`;
