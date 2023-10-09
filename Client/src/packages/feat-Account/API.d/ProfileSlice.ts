import { createSlice } from "@reduxjs/toolkit";
import { getLeaderboard } from "./ProfileThunk";
import Module from "module";

export type leaderboardType = {
  name: string;
  ladder: number;
  wins: number;
  loss: number;
  achievement: Module;
  picture: string;
};

export interface leaderboardState {
  leaderboard: leaderboardType[] | unknown;
  isLoading: boolean;
}

const initialState: leaderboardState = {
  leaderboard: null,
  isLoading: true,
};

const leaderboardSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLeaderboard.fulfilled, (state, action) => {
        state.leaderboard = action.payload;
        state.isLoading = false;
      })
      .addCase(getLeaderboard.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// export type { leaderboardType, leaderboardState };
export const {} = leaderboardSlice.actions;
/** in rootReducer = combineReducers as LeaderBoard */
export default leaderboardSlice.reducer;
