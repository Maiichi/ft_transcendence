import { unBanMember } from "../redux/roomSlice";
import { useAppDispatch } from "../../../../core";
import { ModalConfirm } from "../../../../core/utils/components/ModalConfirm";

export const UnBanUserFromChannelModal = (props: {
  data: any;
  handleClose: () => void;
}) => {
  const { handleClose, data } = props;
  const dispatch = useAppDispatch();
  const handlUnBanUser = () => {
    dispatch(unBanMember(data));
    handleClose();
  };

  return (
    <>
      <ModalConfirm
        title={"Do you want to un ban {`user x`}?"}
        handleClose={handleClose}
        handleClick={handlUnBanUser}
      />
    </>
  );
};
