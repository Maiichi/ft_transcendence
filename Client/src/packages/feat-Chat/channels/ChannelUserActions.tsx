import { useState } from "react";
import { ModalComponent, useAppDispatch, useAppSelector } from "../../../core";
import { Action, I_Room, I_User } from "../components/types";
import {
  checkUserRole,
  getDataForModal,
  ChannelIcons,
  isAdmin,
  isBanned,
  isFriend,
  isBlockedYou,
} from "../components/utils";
import { setDisplayUserActions } from "../../../core/CoreSlice";
import { SetChannelAdmin } from "../components/modals/SetChannelAdmin";
import { BanUserFromChannelModal } from "../components/modals/BanUserFromChannelModal";
import { MuteUserInRoom } from "../components/modals/MuteUserInRoom";
import { UnSetChannelAdmin } from "../components/modals/unSetChannelAdmin";
import { UnBanUserFromChannelModal } from "../components/modals/UnBanUserFromChannel";
import { KicKFromRoomModal } from "../components/modals/KickUserFromChannelModal";
import { NewDirectMessage } from "../components/modals/CreateDirectMessageModal";
import { IconHolder } from "../components/style";
import { Actions } from "../components/UserActions";
import { BlockUserModal } from "../components/modals/BlockUserModal";
import { inviteUserToGame, inviteUserToGameFromChat } from "../../feat-Game/redux/GameSlice";
import { useNavigate } from "react-router-dom";
interface UserActionsProps {
  handleClosePopper?: React.Dispatch<React.SetStateAction<boolean>>;
}
export const UserActionsInRoom = ({ handleClosePopper }: UserActionsProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const { roomId } = useAppSelector((state) => state.chat.currentConversation);
  const { selectedUser } = useAppSelector((state) => state.chat);
  const { memberships } = useAppSelector((state) => state.channels);
  const friends: Array<I_User> = useAppSelector(
    (state) => state.friends.friends
  );

  const navigate = useNavigate();

  const block = useAppSelector((state) => state.block);
  const roomIndex = memberships.findIndex((item: any) => item.id == roomId);
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

  const checkConstraints = (
    selectorId: number,
    selectedId: number,
    Icon: Action
  ) => {
    const role = checkUserRole(memberships[roomIndex], selectorId);

    let checkFriend = true;
    if (typeof Icon.isFriend != "undefined") {
      checkFriend = isFriend(friends, selectedId) == Icon.isFriend;
    }
    let checkIsBanned = true;
    if (typeof Icon.isBanned != "undefined")
      checkIsBanned =
        isBanned(memberships[roomIndex], selectedId) === Icon.isBanned;

    let checkIsAdmin = true;
    if (typeof Icon.isAdmin != "undefined")
      checkIsAdmin =
        isAdmin(memberships[roomIndex], selectedId) === Icon.isAdmin;
    let checkIsBlockedYou = true;
    if (typeof Icon.isBlockedYou != "undefined") {
      checkIsBlockedYou = isBlockedYou(selectedId, block) === Icon.isBlockedYou;
    }
    let checkIsBlockedByeYou = true;
    if (typeof Icon.isBlockedByYou != "undefined") {
      checkIsBlockedByeYou =
        isBlockedYou(selectedId, block) === Icon.isBlockedByYou;
    }

    // let checkIsMute = true;
    // if (typeof Icon.isMuted != 'undefined')
    //   checkIsMute = isMuted(memberships[roomIndex], selectedId) === Icon.isMuted;
    return (
      Icon.role.includes(role) &&
      checkFriend &&
      checkIsBanned &&
      checkIsAdmin &&
      checkIsBlockedByeYou &&
      checkIsBlockedYou
    );
  };

  const getModalComponent = (iconType: any, data: any) => {
    switch (iconType) {
      case "setAdminChannel":
        return <SetChannelAdmin data={data} handleClose={handleClose} />;
      case "unSetAdminChannel":
        return <UnSetChannelAdmin data={data} handleClose={handleClose} />;
      case "banFromChannel":
        return (
          <BanUserFromChannelModal data={data} handleClose={handleClose} />
        );
      case "unBanFromChannel":
        return (
          <UnBanUserFromChannelModal data={data} handleClose={handleClose} />
        );
      case "muteFromChannel":
        return <MuteUserInRoom data={data} handleClose={handleClose} />;
      case "kickFromChannel":
        return <KicKFromRoomModal data={data} handleClose={handleClose} />;
      case "blockFriend":
        return (
          <BlockUserModal
            intraId={selectedUser.intraId}
            userName={selectedUser.firstName + " " + selectedUser.lastName}
            handleClose={handleClose}
          />
        );
      case "message":
        return (
          <NewDirectMessage selectedUser={data} handleClose={handleClose} />
        );
      default:
        return <></>;
    }
  };

  const handleClickIcon = (
    iconType: any,
    room: I_Room,
    selectedUserId: number
  ) => {
    const selectedUser = room.members.find(
      (member) => member.user.intraId === selectedUserId
    );
    
    if (selectedUser) {
      if (iconType === 'play')       {         
          // dispatch(setSelectedUser(selectedUser.user));         
          dispatch(inviteUserToGame({invitedId : selectedUserId, inviterId : user.intraId}));         
          dispatch(inviteUserToGameFromChat(true));         
          navigate('/game');       }
      const dataForModal = getDataForModal(iconType, room, selectedUser.user);
      const modalComponent: JSX.Element = getModalComponent(
        iconType,
        dataForModal
      );
      handleClickModal(modalComponent);
    }
  };

  let color, status;
  if (selectedUser.status == "ONLINE") {
    color = "green";
    status = "Available";
  } else {
    color = "grey";
    status = "Not Available";
  }
  const handleClearIcon = () => {
    if (handleClosePopper) handleClosePopper(false);
    else dispatch(setDisplayUserActions(false));
  };
  const dispatch = useAppDispatch();

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
        avatar_url={selectedUser.avatar_url}
        color={color}
        status={status}
      >
        {ChannelIcons.map((icon: Action) => (
          <>
            {checkConstraints(user.intraId, selectedUser.intraId, icon) && (
              <IconHolder
                onClick={() =>
                  handleClickIcon(
                    icon.type,
                    memberships[roomIndex],
                    selectedUser.intraId
                  )
                }
              >
                {icon.component}
                {icon.name}
              </IconHolder>
            )}
          </>
        ))}
      </Actions>
    </>
  );
};
