export interface I_Room {
  id: number;
  name: string;
  description: string;
  password: string;
  type: string;
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
  type: "direct" | "channel";
  direct: I_DirectConversation | null;
  room: I_Room | null;
}

export interface I_DirectConversation {
  id: number;
  createdAt: string;
  updatedAt: string;
  type: string;
  lastMessage: {
    content: string;
    createdAt: string
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
