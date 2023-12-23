import { useAppDispatch } from "../../../../core";
import { setDisplayUserActions } from "../../../../core/CoreSlice";
import { ModalConfirm } from "../../../../core/utils/components/modals/ModalConfirm";
import { blockUser } from "../../../feat-Account/components/redux/blockSlice";

export const BlockUserModal = (props: {
  intraId: number;
  userName: string;
  handleClose: () => void;
}) => {
  const { handleClose, intraId, userName } = props;
  const dispatch = useAppDispatch();

  const handleBlockUser = () => {
    dispatch(blockUser({ blockedId: intraId }));
    dispatch(setDisplayUserActions(false));
    handleClose();
  };

  return (
    <>
      <ModalConfirm
        title={`You want to block ${userName} ?`}
        handleClose={handleClose}
        handleClick={handleBlockUser}
      />
    </>
  );
};
