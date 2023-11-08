import { createSlice } from "@reduxjs/toolkit";
import { getLeaderboard } from "./ProfileThunk";
import Module from "module";
import { useAppSelector } from "../../../core";
import { TimeLike } from "fs";

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
    on: gamerType;
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
    getuserasgamer(state: ProfileState, action) {
      state.gamer.on = require("../static-data/gamer.json");
      state.gamer.on.user = action.payload;
    },
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
export const { getuserasgamer, getMatchsHistory, getAchievements } =
  profileSlice.actions;
/** in rootReducer = combineReducers as LeaderBoard */
export default profileSlice.reducer;
