import { useAppDispatch } from "../../../../core";
import { ModalConfirm } from "../../../../core/utils/components/ModalConfirm";
import { unSetAdminRoom } from "../redux/roomSlice";

export const UnSetChannelAdmin = (props: {
  data: any;
  handleClose: () => void;
}) => {
  const { handleClose, data } = props;
  const dispatch = useAppDispatch();

  const handleUnSetChannelAdmin = () => {
    dispatch(unSetAdminRoom(data));
    handleClose();
  };

  return (
    <>
      <ModalConfirm
        title={`Do you want to remove the admin previleges for ${data.userName} in #${data.roomName}?`}
        handleClose={handleClose}
        handleClick={handleUnSetChannelAdmin}
      />
    </>
  );
};
