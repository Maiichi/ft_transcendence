export interface I_Room_Search {
  id: number;
  name: string;
  password: string;
  type: string;
  members: I_Members[];
  createdAt: string;
  updatedAt: string;
}

export interface I_Members {
  user: {
    avatar_url: string;
    intraId: number;
  };
}
