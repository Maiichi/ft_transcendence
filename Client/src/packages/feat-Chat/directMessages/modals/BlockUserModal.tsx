import { useAppDispatch } from "../../../../core";
import { setDisplayUserActions } from "../../../../core/CoreSlice";
import { ModalConfirm } from "../../../../core/utils/components/ModalConfirm";
import { blockUser } from "../../components/blockSlice";

export const BlockUserModal = (props: {
  data: any;
  handleClose: () => void;
}) => {
  const { handleClose, data } = props;
  const dispatch = useAppDispatch();

  const handleBlockUser = () => {
    dispatch(blockUser({ blockedId: data.intraId }));
    dispatch(setDisplayUserActions(false));
    handleClose();
  };

  return (
    <>
      <ModalConfirm
        title={"you want to block the user x ?"}
        handleClose={handleClose}
        handleClick={handleBlockUser}
      />
    </>
  );
};
