import { useAppDispatch } from "../../../../core";
import { setDisplayUserActions } from "../../../../core/CoreSlice";
import { ModalConfirm } from "../../../../core/utils/components/ModalConfirm";
import { unblockUser } from "../redux/blockSlice";

export const BlockUserModal = (props: {
  intraId: number;
  handleClose: () => void;
}) => {
  const { handleClose, intraId } = props;
  const dispatch = useAppDispatch();

  const handleBlockUser = () => {
    dispatch(unblockUser({ blockedId: intraId }));
    dispatch(setDisplayUserActions(false));
    handleClose();
  };

  return (
    <>
      <ModalConfirm
        title={"you want to unblock the user x ?"}
        handleClose={handleClose}
        handleClick={handleBlockUser}
      />
    </>
  );
};
