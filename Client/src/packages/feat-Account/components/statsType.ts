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
};

export interface ProfileState {
  isLoading: boolean;
  gamer: gamerType;
  achievement: AchievementType[];
  MatchHistory: MatchHistoryType[];
  lead: {
    leaderboard: leaderboardType;
    isLoading: boolean;
  };
}

export type {
  gamerType,
  leaderboardType,
  AchievementType,
  MatchHistoryType,
  GameslogType,
  userType,
  unformalData,
};
