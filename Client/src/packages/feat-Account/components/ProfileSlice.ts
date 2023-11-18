import { createSlice } from "@reduxjs/toolkit";
import { getLeaderboard, getuserasgamer } from ".";
import Module from "module";

type gamerType = {
  user: any;
  coalition: {
    name: string | null;
    logo: string;
  };
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

export type { gamerType, leaderboardType, AchievementType, MatchHistoryType };

export interface ProfileState {
  gamer: {
    on: gamerType | undefined;
    isLoading: boolean;
  };
  lead: {
    leaderboard: leaderboardType[] | unknown;
    isLoading: boolean;
  };
  achiv: {
    achievement: AchievementType[] | null;
    loaded: boolean;
  };
  matchs: {
    MatchHistory: MatchHistoryType[] | null;
    loaded: boolean;
  };
}

const initialState: ProfileState =
  require("../static-data/initialStates.json").profile;

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getMatchsHistory(state: ProfileState) {
      state.matchs.MatchHistory = Object.values(
        require("../static-data/MatchesHistory.json").matchs
      );
      state.matchs.loaded = true;
    },
    getAchievements(state) {
      state.achiv.achievement = Object.values(
        require("../static-data/Achievements.json")
      );
      state.achiv.loaded = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getuserasgamer.pending, (state) => {
        state.gamer.isLoading = true;
      })
      .addCase(getuserasgamer.fulfilled, (state, action) => {
        state.gamer.on = action.payload;
        state.gamer.isLoading = false;
      })
      .addCase(getuserasgamer.rejected, (state) => {
        state.gamer.isLoading = false;
      })
      .addCase(getLeaderboard.pending, (state) => {
        state.lead.isLoading = true;
      })
      .addCase(getLeaderboard.fulfilled, (state, action) => {
        state.lead.leaderboard = action.payload;
        state.lead.isLoading = false;
      })
      .addCase(getLeaderboard.rejected, (state) => {
        state.lead.isLoading = false;
      });
  },
});

// export type { leaderboardType, leaderboardState };
export const { getMatchsHistory, getAchievements } =
  profileSlice.actions;
/** in rootReducer = combineReducers as LeaderBoard */
export default profileSlice.reducer;
