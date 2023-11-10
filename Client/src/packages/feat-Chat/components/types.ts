export interface I_Room {
  id: number;
  name: string;
  password: string; // must check
  type: "public" | "private" | "protected";
  description: string;
  members: {
    isAdmin: boolean;
    isBanned: boolean;
    isMute: boolean;
    isOwner: boolean;
    user: {
      firstName: string;
      lastName: string;
      userName: string;
      intraId: number;
      avatar_url: string;
    };
  }[];
  conversation: {
    id: number;
    createdAt: string;
    type: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
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