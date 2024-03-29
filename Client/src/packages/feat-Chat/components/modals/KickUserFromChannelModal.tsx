import { kickMember } from "../redux/roomSlice";
import { useAppDispatch } from "../../../../core";

import { setDisplayUserActions } from "../../../../core/CoreSlice";
import { ModalConfirm } from "../../../../core/utils/components/modals/ModalConfirm";

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
        title={`You want to kick ${data.userName} from #${data.roomName} ?`}
        handleClose={handleClose}
        handleClick={handleKickUser}
      />
    </>
  );
};
