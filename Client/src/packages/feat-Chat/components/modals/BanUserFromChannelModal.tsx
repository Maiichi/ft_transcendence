import { banMember } from "../redux/roomSlice";
import { useAppDispatch } from "../../../../core";
import { ModalConfirm } from "../../../../core/utils/components/ModalConfirm";

export const BanUserFromChannelModal = (props: {
  data: any;
  handleClose: () => void;
}) => {
  const { handleClose, data } = props;
  const dispatch = useAppDispatch();
  const handleBanUser = () => {
    dispatch(banMember(data));
    handleClose();
  };

  return (
    <>
      <ModalConfirm
        title={"Do you want to ban {`user x`} from {`channel x`} ?"}
        handleClose={handleClose}
        handleClick={handleBanUser}
      />
    </>
  );
};
