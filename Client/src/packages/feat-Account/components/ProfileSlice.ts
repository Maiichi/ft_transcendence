import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getLeaderboard, getuserasgamer } from "./thunks";
import { ProfileState, leaderboardType } from "./statsType";

const initialState: ProfileState =
  require("../static-data/initialStates.json").profile;

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getuserasgamer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLeaderboard.pending, (state) => {
        state.lead.isLoading = true;
      })
      .addCase(
        getuserasgamer.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.gamer = action.payload.gamer;
          state.gamer.user = action.payload.user.message;
          state.achievement = action.payload.achievement;
          state.MatchHistory = action.payload.matchHistory;

          state.isLoading = false;
        }
      )
      .addCase(
        getLeaderboard.fulfilled,
        (state, action: PayloadAction<leaderboardType[]>) => {
          state.lead.leaderboard = action.payload;
          state.lead.isLoading = false;
        }
      )
      .addCase(getuserasgamer.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getLeaderboard.rejected, (state) => {
        state.lead.isLoading = false;
      });
  },
});

export const {} = profileSlice.actions;
/** in rootReducer = combineReducers as LeaderBoard */
export default profileSlice.reducer;
