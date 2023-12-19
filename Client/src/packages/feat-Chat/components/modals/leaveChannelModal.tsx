import { leaveRoom } from "../redux/roomSlice";
import { useAppDispatch } from "../../../../core";
import { I_Room } from "../types";
import { setCurrentConversation } from "../redux/chatSlice";

import { ModalConfirm } from "../../../../core/utils/components/ModalConfirm";
export const LeaveRoomModal = (props: {
  channelConversation: I_Room;
  handleClose: () => void;
}) => {
  const { handleClose, channelConversation } = props;
  const dispatch = useAppDispatch();

  const handleLeaveRoom = () => {
    console.log("channelId || ", channelConversation.id);
    dispatch(leaveRoom(channelConversation.id));
    dispatch(
      setCurrentConversation({
        roomId: null,
        directConversationId: null,
        type: null,
      })
    );
    handleClose();
  };

  return (
    <>
      <ModalConfirm
        title={` Are you sure you want to leave #${channelConversation.name} ?`}
        subtitle={"This action is irreversible."}
        handleClose={handleClose}
        handleClick={handleLeaveRoom}
      />
    </>
  );
};
