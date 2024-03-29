import { I_User } from "../../../core";

export interface I_Room {
  id: number;
  name: string;
  password: string; // must check
  type: "public" | "private" | "protected";
  description: string;
  members: Members[];
  conversation: {
    id: number;
    createdAt: string;
    type: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}
export interface Members {
  isAdmin: boolean;
  isBanned: boolean;
  isMute: boolean;
  isOwner: boolean;
  timeMute: Date;
  user: I_User;
}
export interface I_Discussion {
  type: "direct" | "channel" | null;
  directConversationId: number | null;
  roomId: number | null;
}

export interface I_DirectConversation {
  id: number;
  createdAt: string;
  updatedAt: string;
  type: string;
  lastMessage: {
    content: string;
    createdAt: string;
  };
  receiver: I_User;
}
export interface I_Message {
  sender: {
    intraId: number;
    firstName: string;
    lastName: string;
    userName: string;
    avatar_url: string;
  };
  id: number;
  content: string;
  createdAt: string;
}
export interface I_ConversationMessages {
  chatId: number;
  messages: I_Message[];
}
export interface Action {
  name: string;
  type:
    | "banFromChannel"
    | "unBanFromChannel"
    | "muteFromChannel"
    | "kickFromChannel"
    | "setAdminChannel"
    | "unSetAdminChannel"
    | "message"
    | "play"
    | "addFriend"
    | "blockFriend"
    | "unblockFriend"
    | "sendFriendRequest"
    | "acceptFriendRequest"
    | "declineFriendRequest"
    | "viewProfile";
  component: JSX.Element;
  isFriend?: boolean;
  isBanned?: boolean;
  isAdmin?: boolean;
  friendRequest?: boolean;
  isBlockedByYou?: boolean;
  isBlockedYou?: boolean;
  role?: Role[];
}

export type Role = "admin" | "owner" | "member";
export interface DataForModal {
  userId?: number;
  userName?: string;
  roomId?: number;
  roomName?: string;
}
