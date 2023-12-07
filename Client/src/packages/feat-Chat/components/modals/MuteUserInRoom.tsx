import { useAppDispatch } from "../../../../core";
import { muteMember } from "../redux/roomSlice";
import { useState } from "react";
import { ModalConfirm } from "../../../../core/utils/components/ModalConfirm";

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
        title={"Do you want to mute {`user x`} ?"}
        handleClose={handleClose}
        handleClick={handleMuteMember}
      />
    </>
  );
};
