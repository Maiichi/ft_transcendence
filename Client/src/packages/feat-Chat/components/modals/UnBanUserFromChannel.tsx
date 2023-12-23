// import { unBanMember } from "../../channels/redux/roomSlice";
import { useAppDispatch } from "../../../../core";
import { ModalConfirm } from "../../../../core/utils/components/modals/ModalConfirm";
import { unBanMember } from "../redux/roomSlice";

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
        title={`Do you want to un ban ${data.userName} from #${data.roomName}?`}
        handleClose={handleClose}
        handleClick={handlUnBanUser}
      />
    </>
  );
};
