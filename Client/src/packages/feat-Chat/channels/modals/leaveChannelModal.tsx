import styled from "styled-components";
import { leaveRoom } from "../redux/roomSlice";
import { useAppDispatch } from "../../../../core";
import { I_Room } from "../../Types/types";

export const LeaveRoomModal = (props: {
  channelConversation: I_Room;
  handleClose: () => void;
}) => {
  const { handleClose, channelConversation } = props;
  const dispatch = useAppDispatch();

  const handleLeaveRoom = () => {
    console.log("channelId || ", channelConversation.id);
    dispatch(leaveRoom(channelConversation.id));
    handleClose();
  };

  return (
    <>
      <ModalHeader>
        <h3>you want to leave #{channelConversation.name} ?</h3>
      </ModalHeader>
      <ModalFooter>
        <ButtonCancel onClick={handleClose}>Cancel</ButtonCancel>
        <ButtonLeave onClick={handleLeaveRoom}>Confirm</ButtonLeave>
      </ModalFooter>
    </>
  );
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
