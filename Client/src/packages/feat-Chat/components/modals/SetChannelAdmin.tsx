import { useAppDispatch } from "../../../../core";
import { ModalConfirm } from "../../../../core/utils/components/ModalConfirm";
import { setAdminRoom } from "../redux/roomSlice";

export const SetChannelAdmin = (props: {
  data: any;
  handleClose: () => void;
}) => {
  const { handleClose, data } = props;
  const dispatch = useAppDispatch();

  const handleSetChannelAdmin = () => {
    dispatch(setAdminRoom(data));
    handleClose();
  };

  return (
    <>
      <ModalConfirm
        title={
          " Do you want to set {`user x`} as admin for this {`channel x`} ?"
        }
        handleClose={handleClose}
        handleClick={handleSetChannelAdmin}
      />
    </>
  );
};
