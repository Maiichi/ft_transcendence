import styled from "styled-components";
import { kickMember, leaveRoom } from "../redux/roomSlice";
import { useAppDispatch } from "../../../../core";
import { I_Room } from "../../components/types";
import { setCurrentConversation } from "../../components/chatSlice";
import { setDisplayUserActions } from "../../../../core/CoreSlice";
import { ModalConfirm } from "../../../../core/utils/components/ModalConfirm";

export const KicKFromRoomModal = (props: {
  data: any;
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
      <ModalConfirm
        title={"you want to kick the user x from channel x ?"}
        handleClose={handleClose}
        handleClick={handleKickUser}
      />
    </>
  );
};
