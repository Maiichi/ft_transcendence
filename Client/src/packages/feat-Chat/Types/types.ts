


export interface Membership {
        id: number;
        members: {
          isAdmin: boolean;
          isBanned: boolean;
          isMute: boolean;
          isOwner: boolean;
          user: {
            firstName: string;
            lastName: string;
            userName: string;
          };
        }[];
        conversation : {
            id: number,
            createdAt: string,
            messages: {
                sender: {},
                content: string,
                createdAt: string
            }[],
            participants:[],
            type: string,
            updatedAt: string
        }
        name: string;
        createdAt: string;
        updatedAt: string;
        password: string;
        type: string;
}

export interface Conversation {
    id: number;
    createdAt: string;
    updatedAt: string;
    type: string;
    messages: { content: string; createdAt: string }[];
    participants: {
      userName: string;
      firstName: string;
      lastName: string;
      status: string;
    }[];
  }

export interface messageData {
    sender: {
        intraId: number,
        firstName: string,
        lastName: string,
        userName: string
    },
    content: string,
    createdAt: string
}