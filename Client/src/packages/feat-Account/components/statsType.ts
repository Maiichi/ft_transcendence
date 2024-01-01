type AddLoading<T> = {
  foo: T;
  isLoading: boolean;
};

type userType = {
  intraId: number;
  firstName: string;
  lastName: string;
  userName: string;
  avatar_url: string;
  status: "ONLINE" | "OFFLINE";
  inGame: boolean;
  inQueue: boolean;
} & Record<string, any>;

// TODO: should be formal
type unformalData = {
  user: userType;
  matchHistory: MatchHistoryType[];
  achievement: { name: string }[];
};

type gamerType = {
  user: userType;
  totalmatch: number;
  wins: number;
  achivs: number;
  rank: number;
};

type leaderboardType = Array<leaderboardplayerType>;
type leaderboardplayerType = {
  name: string;
  winRate: number;
  wins: number;
  losses: number;
  userId: number;
  avatar_url: string;
};

type AchievementType = {
  name: string;
  logo: string;
  discription: string;
};

type GameslogType = Array<MatchHistoryType>;
type Players = {
  intraId: number;
  avatar_url: string;
  userName: string;
} & {
  score?: number;
};
type MatchHistoryType = {
  Players: Players[];
  createdAt: string;
  score1: number;
  score2: number;
  type: "dual" | string;
  winnerId: number;
};

export interface ProfileState {
  isLoading: boolean;
  error: string | null;
  gamer: gamerType;
  achievement: { name: string }[];
  matchs: {
    matchsHistory: GameslogType;
    isLoading: boolean;
  };
  lead: {
    leaderboard: leaderboardType;
    isLoading: boolean;
  };
}

export type {
  AddLoading,
  gamerType,
  leaderboardType,
  AchievementType,
  MatchHistoryType,
  GameslogType,
  userType,
  unformalData,
};
