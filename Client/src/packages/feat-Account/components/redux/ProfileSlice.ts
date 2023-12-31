import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getLeaderboard, getMatchHistory, getuserasgamer } from ".";
import {
  GameslogType,
  ProfileState,
  leaderboardType,
  unformalData,
} from "../statsType";

const initialState: ProfileState =
  require("../../static-data/initialStates.json").profile;

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
      .addCase(getMatchHistory.pending, (state) => {
        state.matchs.isLoading = true;
      })
      .addCase(
        getuserasgamer.fulfilled,
        (state, action: PayloadAction<unformalData>) => {
          state.gamer = {
            user: action.payload.user.message,
            totalmatch: 43,
            wins: 43,
            achivs: 43,
            rank: 43,
          };
          state.achievement = action.payload.achievement;
          state.isLoading = false;
        }
      )
      .addCase(
        getLeaderboard.fulfilled,
        (state, action: PayloadAction<leaderboardType>) => {
          state.lead.leaderboard = action.payload;
          state.lead.isLoading = false;
        }
      )
      .addCase(
        getMatchHistory.fulfilled,
        (state, action: PayloadAction<GameslogType>) => {
          state.matchs.matchsHistory = action.payload;
          // logic for winer and losser score
          state.matchs.matchsHistory.forEach((match) => {
            if (match.Players.length !== 2) return; // never applied
            const winnerScore =
              match.winnerId === match.Players[0].intraId ? 0 : 1;
            const loserScore = winnerScore ? 0 : 1;
            match.Players[winnerScore].score = Math.max(
              match.score1,
              match.score2
            );
            match.Players[loserScore].score = Math.min(
              match.score1,
              match.score2
            );
          });
          state.matchs.isLoading = false;
        }
      )
      .addCase(getuserasgamer.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getLeaderboard.rejected, (state) => {
        state.lead.isLoading = false;
      })
      .addCase(getMatchHistory.rejected, (state) => {
        state.matchs.isLoading = false;
      });
  },
});

export const {} = profileSlice.actions;
/** in rootReducer = combineReducers as LeaderBoard */
export default profileSlice.reducer;
