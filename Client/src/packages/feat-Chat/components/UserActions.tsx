import { Children, useState } from "react";
import { ModalComponent, useAppDispatch, useAppSelector } from "../../../core";
import { Action, I_Room, I_User } from "./types";

import {
  DoDisturbOffOutlined,
  PersonOffOutlined,
  RemoveModerator,
} from "@mui/icons-material";
import { Avatar, Divider } from "@mui/material";
import styled from "styled-components";
import { checkUserRole, isAdmin, isBanned, isFriend } from "./utils";
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
import { UserActionInDirectConversation } from "../directMessages/DirectUserActions";
import { IconHolder, RightSide } from "./style";
import { UserActionsInRoom } from "../channels/ChannelUserActions";

interface UserActionsProps {
  handleClosePopper?: React.Dispatch<React.SetStateAction<boolean>>;
}
export const UserActions = ({ handleClosePopper }: UserActionsProps) => {
  const { currentConversation } = useAppSelector((state) => state.chat);
  if (currentConversation.type == "direct")
    return (
      <UserActionInDirectConversation handleClosePopper={handleClosePopper} />
    );
  else if (currentConversation.type == "channel")
    return <UserActionsInRoom handleClosePopper={handleClosePopper} />;
  else return <></>;
};

export const Actions = ({
  children,
  handleCLose,
  username,
  color,
  status,
}: {
  children: React.ReactNode;
  handleCLose: any;
  username: any;
  color: any;
  status: any;
}) => {
  return (
    <RightSide>
      <Header>
        <h2 style={{ margin: 0 }}>{username}</h2>
        <ClearIcon onClick={handleCLose} />
      </Header>
      <AvatarHolder>
        <Avatar
          sx={{ width: "120px", height: "120px" }}
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
        />
        <StatusHolder>
          <CircleIcon sx={{ color: color }} />
          <p style={{ margin: 0 }}>{status}</p>
        </StatusHolder>
      </AvatarHolder>
      <Divider sx={{ width: "80%", margin: "6px auto" }} />
      <IconsHolder>{children}</IconsHolder>
    </RightSide>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;
const AvatarHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StatusHolder = styled.div`
  display: flex;
`;
const IconsHolder = styled.div`
  padding: 5px;
`;
