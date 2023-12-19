import { useAppSelector } from "../../../core";
import { Avatar, Divider } from "@mui/material";
import styled from "styled-components";
import CircleIcon from "@mui/icons-material/Circle";
import ClearIcon from "@mui/icons-material/Clear";
import { UserActionInDirectConversation } from "../directMessages/DirectUserActions";
import { RightSide } from "./style";
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
  avatar_url,
  color,
  status,
}: {
  children: React.ReactNode;
  handleCLose: any;
  username: any;
  avatar_url: any;
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
          src={avatar_url}
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
