import { useState } from "react";
import { ModalComponent, useAppDispatch, useAppSelector } from "../../../core";
import { Action, I_Room, I_User } from "./types";

import {
  DoDisturbOffOutlined,
  PersonOffOutlined,
  RemoveModerator,
} from "@mui/icons-material";
import { Avatar, Divider } from "@mui/material";
import styled from "styled-components";
import {
  checkUserRole,
  isAdmin,
  isBanned,
  isFriend,
} from "./utils";
import { setDisplayUserActions } from "../../../core/CoreSlice";
import CircleIcon from "@mui/icons-material/Circle";
import ClearIcon from "@mui/icons-material/Clear";
import EmailIcon from "@mui/icons-material/Email";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GamesIcon from "@mui/icons-material/Games";
import { SetChannelAdmin } from "../channels/modals/SetChannelAdmin";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { BanUserFromChannelModal } from "../channels/modals/BanUserFromChannelModal";
import { MuteUserInRoom } from "../channels/modals/MuteUserInRoom";
import { UnSetChannelAdmin } from "../channels/modals/unSetChannelAdmin";
import { UnBanUserFromChannelModal } from "../channels/modals/UnBanUserFromChannel";
import { KicKFromRoomModal } from "../channels/modals/KickUserFromChannelModal";
import { NewDirectMessage } from "../directMessages/modals/CreateDirectMessageModal";
import { UserActionInDirectConversation } from "../directMessages/DirectBoxRight";
import { setSelectedUser } from "./chatSlice";
import { useNavigate } from "react-router-dom";
import { inviteUserToGame, inviteUserToGameFromChat } from "../../feat-Game/redux/GameSlice";

export const Icons: Array<Action> = [
  {
    name: "Ban from channel",
    type: "banFromChannel",
    component: <RemoveCircleOutlineIcon />,
    role: ["admin", "owner"],
    isBanned: false,
  },
  {
    name: "unBan from channel",
    type: "unBanFromChannel",
    component: <DoDisturbOffOutlined />,
    role: ["admin", "owner"],
    isBanned: true,
  },
  {
    name: "Mute",
    type: "muteFromChannel",
    component: <SpeakerNotesOffIcon />,
    role: ["admin", "owner"],
  },
  {
    name: "Kick from channel",
    type: "kickFromChannel",
    component: <PersonOffOutlined />,
    role: ["admin", "owner"],
  },
  {
    name: "Give administrator privileges",
    type: "setAdminChannel",
    component: <AdminPanelSettingsIcon />,
    role: ["owner"],
    isAdmin : false,
  },
  {
    name: "remove administrator privileges",
    type: "unSetAdminChannel",
    component: <RemoveModerator />,
    role: ["owner"],
    isAdmin: true,
  },
  {
    name: "View profile",
    type: "viewProfile",
    component: <AccountCircleIcon />,
    role: ["member", "admin", "owner"],
  },
  {
    name: "Send Message",
    type: "message",
    component: <EmailIcon />,
    isFriend: true,
    role: ["member", "admin", "owner"],
  },
  {
    name: "Invite to a game",
    type: "play",
    component: <GamesIcon />,
    isFriend: true,
    role: ["member", "admin", "owner"],
  },
  {
    name: "Add to friend list",
    type: "addFriend",
    component: <PersonAddIcon />,
    isFriend: false,
    role: ["member", "admin", "owner"],
  },
  {
    name: "Block",
    type: "blockFriend",
    component: <PersonOffIcon />,
    isFriend: true,
    role: ["member", "admin", "owner"],
  },
];

const getDataForModal = (
  iconType: any,
  room: I_Room,
  selectedUser: I_User
) => {
  switch (iconType) {
    case "setAdminChannel":
      return {
        userId: selectedUser.intraId,
        roomId: room.id,
      };
    case "unSetAdminChannel":
      return {
        userId: selectedUser.intraId,
        roomId: room.id
      };
    case "banFromChannel":
      return {
        userId: selectedUser.intraId,
        roomId: room.id
      };
    case "unBanFromChannel":
      return {
        userId: selectedUser.intraId,
        roomId: room.id
      };
    case "muteFromChannel":
      return {
        userId: selectedUser.intraId,
        roomId: room.id
      };
    case "kickFromChannel":
      return {
        userId: selectedUser.intraId,
        roomId: room.id,
      };
    case "message": 
      return selectedUser;
    default:
      return null;
  }
};  

export const UserActions = () => {

  const { currentConversation } = useAppSelector((state) => state.chat);
  if (currentConversation.type == "direct")
    return <UserActionInDirectConversation />;
  else if (currentConversation.type == "channel")
    return <UserActionsInRoom />;
  else 
    return <></>;
}

export const UserActionsInRoom = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { roomId } = useAppSelector((state) => state.chat.currentConversation);
  const { selectedUser } = useAppSelector((state) => state.chat);
  const { memberships } = useAppSelector((state) => state.channels);
  const friends: Array<I_User> = useAppSelector((state) => state.friends.friends);
  const roomIndex = memberships.findIndex((item: any) => item.id == roomId);
  // const selectdUserIndex = memberships[roomIndex].members.findIndex((member: any) => selectedUserId === member.user.intraId);
  // const selectedUserInfo = memberships[roomIndex].members[selectdUserIndex];
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [closeType, setCloseType] = useState<"auto" | "click" | undefined>(
    undefined
  );
  const [ChildModal, setChildModal] = useState<JSX.Element>(<></>);
  const handleClickModal = (
    childModal: JSX.Element,
    closeType?: "auto" | "click"
  ) => {
    console.log("handleClickModal called !!");
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
    if (typeof Icon.isBanned != 'undefined')
      checkIsBanned = isBanned(memberships[roomIndex], selectedId) === Icon.isBanned;
    
    let checkIsAdmin = true;
    if (typeof Icon.isAdmin != 'undefined')
      checkIsAdmin = isAdmin(memberships[roomIndex], selectedId) === Icon.isAdmin;

    // let checkIsMute = true;
    // if (typeof Icon.isMuted != 'undefined')
    //   checkIsMute = isMuted(memberships[roomIndex], selectedId) === Icon.isMuted;
    
    return Icon.role.includes(role) && checkFriend 
          && checkIsBanned && checkIsAdmin;
  };

  const getModalComponent = (iconType: any, data: any) => {
    switch (iconType) {
      case "setAdminChannel":
        return <SetChannelAdmin data={data} handleClose={handleClose} />;
      case "unSetAdminChannel":
        return <UnSetChannelAdmin data={data} handleClose={handleClose} />;
      case "banFromChannel":
        return <BanUserFromChannelModal data={data} handleClose={handleClose} />;
      case "unBanFromChannel":
        return <UnBanUserFromChannelModal data={data} handleClose={handleClose} />;
      case "muteFromChannel":
        return <MuteUserInRoom data={data} handleClose={handleClose} />;
      case "kickFromChannel":
        return <KicKFromRoomModal data={data} handleClose={handleClose} />;
      case "message":
        return <NewDirectMessage selectedUser={data} handleClose={handleClose} />
      default:
        return <></>;
    }
  };

  const handleClickIcon = (
    iconType: any,
    room: I_Room,
    selectedUserId: number
  ) => {
    const selectedUser = room.members.find((member) => member.user.intraId === selectedUserId);  
    if (selectedUser) {
      if (iconType === 'play')
      {
        // dispatch(setSelectedUser(selectedUser.user));
        dispatch(inviteUserToGame({
          invitedId : selectedUserId,
          inviterId : user.intraId
        }));
        dispatch(inviteUserToGameFromChat(true));
        navigate('/game');
      }
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

  const dispatch = useAppDispatch();

  return (
    <RightSide>
      <ModalComponent
        open={open}
        ChildComponent={ChildModal}
        handleClose={handleClose}
        closeType={closeType}
      />
      <ClearIcon onClick={() => dispatch(setDisplayUserActions(false))} />
      <h2>{selectedUser.userName}</h2>
      <Avatar sx={{ height : 100, width : 100 }} src={selectedUser.avatar_url} alt={selectedUser.userName} />
      <CircleIcon sx={{ color: color }} />
      <p>{status}</p>
      <Divider variant="fullWidth" />
      <IconsHolder>
        {Icons.map((icon: Action) => (
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
      </IconsHolder>
    </RightSide>
  );
};

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  flex: 2 1 0%;
  border-left: 1px solid rgb(215, 215, 215);
`;

/** CHANNEL USERS **/

const IconHolder = styled.div`
  display: flex;
  margin: 10px 0px 10px 0px;
  gap: 5px;
  cursor: pointer;
  &:hover {
    background-color: rgb(245, 246, 247);
  }
`;

const IconsHolder = styled.div``;

const Tab = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(94, 53, 177);
  margin: 0px 10px 0px 10px;
  font-weight: 900;
`;
const ChannelMembers = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #d7d7d7;
  border-radius: 7px;
  margin: 2px;
  cursor: pointer;
  padding: 5px;
  width: fit-content;
  height: fit-content;
  &:hover {
    background-color: #f1f1f1;
  }
`;
