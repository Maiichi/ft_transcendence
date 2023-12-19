type AddLoading<T> = {
  foo: T;
  isLoading: boolean;
};

type userType = {
  intraId: number;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  avatar_url: string;
  status: "ONLINE" | "OFFLINE";
  twoFactorActivate: boolean;
  twoFactorSecret: string;
  createdAt: string;
  updatedAt: string;
} & Record<string, any>;

// TODO: should be formal
type unformalData = {
  gamer: gamerType;
  user: userType;
  matchHistory: MatchHistoryType[];
  achievement: AchievementType[];
};

type gamerType = {
  user: userType;
  totalmatch: 21;
  wins: 13;
  achivs: 7;
  rank: number;
};

type leaderboardType = Array<leaderboardplayerType>;
type leaderboardplayerType = {
  name: string;
  ladder: number;
  wins: number;
  loss: number;
  uid: number;
  picture: string;
};

type AchievementType = {
  name: string;
  logo: string;
  discription: string;
  progress: number;
};

type GameslogType = Array<MatchHistoryType>;
type MatchHistoryType = {
  name: string;
  pic: string;
  time: string;
  gain: number;
  nogain: number;
  result: boolean | -1;
};

export interface ProfileState {
  isLoading: boolean;
  gamer: gamerType;
  achievement: AchievementType[];
  matchs: {
    matchsHistory: GameslogType;
    isLoading: boolean;
  };
  lead: {
    leaderboard: leaderboardType;
    isLoading: boolean;
  };
}

type RelationShipType =
  | "notfriend"
  | "friend"
  | "blocked"
  | "blockedMe"
  | "requested"
  | "requester"
  | "self";

export type {
  AddLoading,
  gamerType,
  leaderboardType,
  AchievementType,
  MatchHistoryType,
  GameslogType,
  userType,
  unformalData,
  RelationShipType,
};
