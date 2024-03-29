import { useAppDispatch } from "../../../../core";
import { muteMember } from "../redux/roomSlice";
import { useState } from "react";
import { ModalConfirm } from "../../../../core/utils/components/modals/ModalConfirm";

export const MuteUserInRoom = (props: {
  data: any;
  handleClose: () => void;
}) => {
  const { handleClose, data } = props;
  const [muteTime, setMuteTime] = useState<number>(0);
  const dispatch = useAppDispatch();

  const handleMuteMember = () => {
    setMuteTime(60);
    const DataMute = {
      roomId: data.roomId,
      userId: data.userId,
      timeMute: 60,
    };

    dispatch(muteMember(DataMute));
    handleClose();
  };

  return (
    <>
      <ModalConfirm
        title={`You want to mute ${data.userName} for 1 Hour?`}
        handleClose={handleClose}
        handleClick={handleMuteMember}
      />
    </>
  );
};
