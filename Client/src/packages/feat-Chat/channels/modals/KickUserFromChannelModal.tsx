import styled from "styled-components";
import { kickMember, leaveRoom } from "../redux/roomSlice";
import { useAppDispatch } from "../../../../core";
import { I_Room } from "../../components/types";
import { setCurrentConversation } from "../../components/chatSlice";
import { setDisplayUserActions } from "../../../../core/CoreSlice";

export const KicKFromRoomModal = (props: {
  data: any
  handleClose: () => void;
}) => {
  const { handleClose, data } = props;
  const dispatch = useAppDispatch();

  const handleKickUser = () => {

    dispatch(kickMember(data));
    dispatch(setDisplayUserActions(false));
    handleClose();
  };

  return (
    <>
      <ModalHeader>
        <h3>you want to kick the user x from channel x ?</h3>
      </ModalHeader>
      <ModalFooter>
        <ButtonCancel onClick={handleClose}>Cancel</ButtonCancel>
        <ButtonLeave onClick={handleKickUser}>Confirm</ButtonLeave>
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
