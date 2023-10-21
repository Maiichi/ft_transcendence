import { createSlice } from "@reduxjs/toolkit";
import { getLeaderboard } from "./ProfileThunk";
import Module from "module";

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
  logo: Module;
};
type MatchHistoryType = {
  name: string;
};

export type { leaderboardType, AchievementType, MatchHistoryType };

export interface ProfileState {
  lead: {
    leaderboard: leaderboardType[] | unknown;
    isLoading: boolean;
  };
  achiv: {
    achievement: AchievementType[] | null;
    isLoading: boolean;
  };
  matchs: {
    MatchHistory: MatchHistoryType[] | null;
    isLoading: boolean;
  };
}

const initialState: ProfileState = {
  lead: {
    leaderboard: null,
    isLoading: false,
  },
  achiv: {
    achievement: null,
    isLoading: false,
  },
  matchs: {
    MatchHistory: null,
    isLoading: false,
  },
};

const leaderboardSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getMatchsHistory(state: ProfileState) {
      state.achiv = initialState.achiv;
    },
    getAchievements(state) {
      state.matchs = initialState.matchs;
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
export const { getMatchsHistory, getAchievements } = leaderboardSlice.actions;
/** in rootReducer = combineReducers as LeaderBoard */
export default leaderboardSlice.reducer;
