import { useState } from "react";
import { ModalComponent, useAppDispatch, useAppSelector } from "../../../core";
import { Action, I_Room, User } from "./types";

import {
  LogoutRounded,
  MoreHorizOutlined,
  Person,
  PersonAddAltRounded,
  Settings,
} from "@mui/icons-material";
import { Avatar, Badge, Divider } from "@mui/material";
import { AddUserToRoomModal } from "../channels/modals/AddUserToRoomModal";
import styled from "styled-components";
import {
  changeMessageLength,
  checkUserRole,
  convertDateTime,
  isFriend,
  isOwner,
} from "./utils";
import { UsersRoom } from "../channels/modals/UsersRoomModal";
import { LeaveRoomModal } from "../channels/modals/leaveChannelModal";
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

const Icons: Array<Action> = [
  {
    name: "Ban from channel",
    type: "banFromChannel",
    component: <RemoveCircleOutlineIcon />,
    role: ["admin", "owner"],
  },
  {
    name: "Mute",
    type: "muteFromChannel",
    component: <SpeakerNotesOffIcon />,
    role: ["admin", "owner"],
  },
  {
    name: "Give administrator privileges",
    type: "setAdminChannel",
    component: <AdminPanelSettingsIcon />,
    role: ["owner"],
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
  {
    name: "Invite to Room",
    type: "inviteToChannel",
    component: <PersonOffIcon />,
    isFriend: true,
    role: ["admin", "owner"],
  },
];

const getDataForModal = (
  iconType: any,
  room: I_Room,
  selectedUserId: number
) => {
  switch (iconType) {
    case "setAdminChannel":
      return {
        userId: selectedUserId,
        roomId: room.id,
      };
    default:
      return null;
  }
};

export const UserActions = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { roomId } = useAppSelector((state) => state.chat.currentConversation);
  const { selectedUser } = useAppSelector((state) => state.chat);
  const { memberships } = useAppSelector((state) => state.channels);
  const friends: Array<User> = useAppSelector((state) => state.friends.friends);
  const roomIndex = memberships.findIndex((item: any) => item.id == roomId);
  // const selectdUserIndex = memberships[roomIndex].members.findIndex((member: any) => selectedUserId === member.user.intraId);
  // const selectedUserInfo = memberships[roomIndex].members[selectdUserIndex];

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

    return Icon.role.includes(role) && checkFriend;
  };

  const getModalComponent = (iconType: any, data: any) => {
    switch (iconType) {
      case "setAdminChannel":
        return <SetChannelAdmin data={data} handleClose={handleClose} />;
      default:
        return <></>;
    }
  };

  const handleClickIcon = (
    iconType: any,
    room: I_Room,
    selectedUserId: number
  ) => {
    const dataForModal = getDataForModal(iconType, room, selectedUserId);
    const modalComponent: JSX.Element = getModalComponent(
      iconType,
      dataForModal
    );
    handleClickModal(modalComponent);
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
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <CircleIcon sx={{ color: color }} />
      <p>{status}</p>
      <Divider variant="inset" />
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
