import Module from "module";

type userType = {
  intraId: number;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  avatar_url: string;
  status: string;
  twoFactorActivate: boolean;
  twoFactorSecret: string;
  createdAt: string;
  updatedAt: string;
} & Record<string, any>;

type unformalData = {
  gamer: gamerType;
  user: userType;
  matchHistory: MatchHistoryType[];
  achievement: AchievementType[];
};

type gamerType = {
  user: userType;
  coalition: {
    name: string | null;
    logo: string;
  };
  totalmatch: 21;
  wins: 13;
  achivs: 7;
  rank: number;
};
type leaderboardType = {
  name: string;
  ladder: number;
  wins: number;
  loss: number;
  achievement: Module;
  picture: string;
};
type AchievementType = {
  name: string;
  score: number;
  logo: string;
  discription: string;
};
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
    leaderboard: leaderboardType[];
    isLoading: boolean;
  };
}

export type {
  gamerType,
  leaderboardType,
  AchievementType,
  MatchHistoryType,
  userType,
  unformalData,
};
