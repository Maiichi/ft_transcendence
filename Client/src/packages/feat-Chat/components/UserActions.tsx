import { useState } from "react";
import { ModalComponent, useAppDispatch, useAppSelector } from "../../../core";
import { Actions, I_Room } from "./types";

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
import { changeMessageLength, convertDateTime, isOwner } from "./utils";
import { UsersRoom } from "../channels/modals/UsersRoomModal";
import { LeaveRoomModal } from "../channels/modals/leaveChannelModal";
import { setDisplayUserActions } from "../../../core/CoreSlice";
import CircleIcon from "@mui/icons-material/Circle";
import ClearIcon from "@mui/icons-material/Clear";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import MessageIcon from "@mui/icons-material/Message";
import EmailIcon from "@mui/icons-material/Email";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import GamesIcon from "@mui/icons-material/Games";
const Icons: Array<Actions> = [
  {
    name: "Ban from channel",
    type: "banFromRoom",
    component: <RemoveCircleOutlineIcon />,
    constraint: {
      isAdmin: true,
    },
  },
  {
    name: "Mute",
    type: "muteFromRoom",
    component: <SpeakerNotesOffIcon />,
    constraint: {
      isAdmin: true,
    },
  },
  {
    name: "Give administrator privileges",
    type: "setAdminRoom",
    component: <AdminPanelSettingsIcon />,
    constraint: {
      isAdmin: true,
    },
  },

  {
    name: "Send Message",
    type: "message",
    component: <EmailIcon />,
    constraint: {
      isFriend: true,
    },
  },
  {
    name: "Invite to a game",
    type: "play",
    component: <GamesIcon />,
    constraint: {},
  },
  {
    name: "Add to friend list",
    type: "addFriend",
    component: <PersonAddIcon />,
    constraint: {
      isFriend: false,
    },
  },
  {
    name: "Block",
    type: "blockFriend",
    component: <PersonOffIcon />,
    constraint: {
      isFriend: true,
    },
  },
  {
    name: "Invite to Room",
    type: "inviteToRoom",
    component: <PersonOffIcon />,
    constraint: {
      isAdmin: true,
    },
  },
];
export const UserActions = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  return (
    <RightSide>
      <ClearIcon onClick={() => dispatch(setDisplayUserActions(false))} />
      <h2>ibouroum</h2>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <CircleIcon sx={{ color: "green" }} />
      <p>Available</p>
      <Divider variant="inset" />
      <IconsHolder>
        {Icons.map((icon) => (
          <IconHolder>
            {icon.component}
            {icon.name}
          </IconHolder>
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
  margin-top: 15px;
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
