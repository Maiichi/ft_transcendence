import { banMember } from "../redux/roomSlice";
import { useAppDispatch } from "../../../../core";
import { ModalConfirm } from "../../../../core/utils/components/ModalConfirm";

export const BanUserFromChannelModal = (props: {
  data: any;
  handleClose: () => void;
}) => {
  const { handleClose, data } = props;
  console.log("data : ", data);
  const dispatch = useAppDispatch();
  const handleBanUser = () => {
    dispatch(banMember(data));
    handleClose();
  };

  return (
    <>
      <ModalConfirm
        title={`Do you want to ban ${data.userName} from #${data.roomName} ?`}
        handleClose={handleClose}
        handleClick={handleBanUser}
      />
    </>
  );
};
