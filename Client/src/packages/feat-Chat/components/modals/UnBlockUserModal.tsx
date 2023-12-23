import { useAppDispatch } from "../../../../core";
import { setDisplayUserActions } from "../../../../core/CoreSlice";
import { ModalConfirm } from "../../../../core/utils/components/modals/ModalConfirm";
import { unblockUser } from "../../../feat-Account/components/redux/blockSlice";

export const UnBlockUserModal = (props: {
  intraId: number;
  userName: string;
  handleClose: () => void;
}) => {
  const { handleClose, intraId, userName } = props;
  const dispatch = useAppDispatch();

  const handleBlockUser = () => {
    dispatch(unblockUser({ blockedId: intraId }));
    dispatch(setDisplayUserActions(false));
    handleClose();
  };

  return (
    <>
      <ModalConfirm
        title={`You want to unblock ${userName} ?`}
        handleClose={handleClose}
        handleClick={handleBlockUser}
      />
    </>
  );
};
