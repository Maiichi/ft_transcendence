import { I_Room, Members, Role, I_User, Action } from "./types";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  DoDisturbOffOutlined,
  PersonOffOutlined,
  RemoveModerator,
} from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GamesIcon from "@mui/icons-material/Games";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const changeMessageLength = (message: string) => {
  if (message.length > 60) {
    message = message.substring(0, 60);
    return message + "...";
  }
  return message;
};

// function to change date format
export const convertDateTime = (dateString: string): string => {
  const now = new Date();
  const inputDate = new Date(dateString);

  const isSameDate = now.toDateString() === inputDate.toDateString();

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = yesterday.toDateString() === inputDate.toDateString();

  if (isSameDate) {
    const hours = inputDate.getHours().toString().padStart(2, "0");
    const minutes = inputDate.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } else if (isYesterday) {
    return `yesterday`;
  } else {
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const day = inputDate.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  }
};
export const isOwner = (membership: I_Room, userId: number) => {
  const member = membership.members.find(
    (member) => member.user.intraId === userId
  );
  return member?.isOwner ? true : false;
};

export const isAdmin = (memberships: I_Room, userId: number) => {
  const member = memberships.members.find(
    (member) => member.user.intraId === userId
  );

  return member?.isAdmin ? true : false;
};

export const isFriend = (friends: Array<I_User>, userId: number) => {
  const isFriend = friends.find((member) => member.intraId === userId);
  return isFriend ? true : false;
};

export const isMuted = (room: I_Room, userId: number) => {
  const member = room.members.find((member) => member.user.intraId === userId);
  const date = new Date();
  if (member) return new Date(member.timeMute) > date ? true : false;
};

export const isBanned = (room: I_Room, userId: number) => {
  const member = room.members.find((member) => member.user.intraId === userId);
  console.log("isBanned ==", member?.isBanned);
  return member?.isBanned ? true : false;
};

export const checkUserRole = (membership: I_Room, userId: number) => {
  const member = membership?.members.find(
    (member) => member.user.intraId === userId
  );
  switch (true) {
    case member?.isOwner:
      return "owner";
    case member?.isAdmin:
      return "admin";
    default:
      return "member";
  }
};
export const ChannelIcons: Array<Action> = [
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
    isAdmin: false,
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
export const DirectIcons: Array<Action> = [
  {
    name: "View profile",
    type: "viewProfile",
    component: <AccountCircleIcon />,
    role: ["member"],
  },
  {
    name: "Invite to a game",
    type: "play",
    component: <GamesIcon />,
    role: ["member"],
  },
  {
    name: "Block",
    type: "blockFriend",
    component: <PersonOffIcon />,
    role: ["member"],
  },
];
export const getDataForModal = (
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
        roomId: room.id,
      };
    case "banFromChannel":
      return {
        userId: selectedUser.intraId,
        roomId: room.id,
      };
    case "unBanFromChannel":
      return {
        userId: selectedUser.intraId,
        roomId: room.id,
      };
    case "muteFromChannel":
      return {
        userId: selectedUser.intraId,
        roomId: room.id,
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
