import { ModalComponent, useAppDispatch, useAppSelector } from "../../../core";
import { setDisplayUserActions } from "../../../core/CoreSlice";
import { useState } from "react";
import { I_User } from "../components/types";

import { BlockUserModal } from "../components/modals/BlockUserModal";
import { Actions } from "../components/UserActions";
import { IconHolder } from "../components/style";
import { DirectIcons } from "../components/utils";
interface UserActionsProps {
  handleClosePopper?: React.Dispatch<React.SetStateAction<boolean>>;
}
export const UserActionInDirectConversation = ({
  handleClosePopper,
}: UserActionsProps) => {
  const dispatch = useAppDispatch();
  const { selectedUser } = useAppSelector((state) => state.chat);
  const [open, setOpen] = useState(false);
  const [closeType, setCloseType] = useState<"auto" | "click" | undefined>(
    undefined
  );
  const [ChildModal, setChildModal] = useState<JSX.Element>(<></>);
  const handleClickModal = (
    childModal: JSX.Element,
    closeType?: "auto" | "click"
  ) => {
    setCloseType(closeType);
    setOpen(true);
    setChildModal(childModal);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickIcon = (iconType: any, selectedUser: I_User) => {
    switch (iconType) {
      case "blockFriend":
        handleClickModal(
          <BlockUserModal
            intraId={selectedUser.intraId}
            userName={selectedUser.firstName + " " + selectedUser.lastName}
            handleClose={handleClose}
          />
        );
        break;

      default:
        break;
    }
  };
  const handleClearIcon = () => {
    if (handleClosePopper) handleClosePopper(false);
    else dispatch(setDisplayUserActions(false));
  };
  return (
    <>
      <ModalComponent
        open={open}
        ChildComponent={ChildModal}
        handleClose={handleClose}
        closeType={closeType}
      />
      <Actions
        handleCLose={handleClearIcon}
        username={selectedUser.userName}
        color={"green"}
        status={"Available"}
      >
        {DirectIcons.map((icon) => (
          <IconHolder onClick={() => handleClickIcon(icon.type, selectedUser)}>
            {icon.component}
            {icon.name}
          </IconHolder>
        ))}
      </Actions>
    </>
  );
};
