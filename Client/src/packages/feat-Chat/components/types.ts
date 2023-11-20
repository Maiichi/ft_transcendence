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
  timeMute: Date,
  user: User;
}
export interface I_Discussion {
  type: "direct" | "channel" | null;
  directConversationId: number | null;
  roomId: number | null;
}

export interface User {
  firstName: string;
  lastName: string;
  userName: string;
  intraId: number;
  status: string;
  avatar_url?: string;
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
  receiver: {
    userName: string;
    firstName: string;
    lastName: string;
    status: string;
    avatar_url: string;
  };
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
  conversationId: number;
  messages: I_Message[];
}
export interface Action {
  name: string;
  type:
    | "banFromChannel"
    | "muteFromChannel"
    | "setAdminChannel"
    | "unSetAdminChannel"
    | "message"
    | "play"
    | "addFriend"
    | "blockFriend"
    | "inviteToChannel"
    | "viewProfile"
    | "inviteToRoom";
  component: JSX.Element;
  isFriend?: boolean;
  role: Role[];
}

export type Role = "admin" | "owner" | "member";
