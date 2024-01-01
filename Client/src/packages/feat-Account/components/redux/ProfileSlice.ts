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
  reducers: {
    setToNoError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getuserasgamer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
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
          state.achievement = action.payload.achievement;
          state.gamer = {
            ...state.gamer,
            user: action.payload.user?.message,
            achivs: action.payload.achievement?.length,
          };
          state.isLoading = false;
        }
      )
      .addCase(
        getLeaderboard.fulfilled,
        (state, action: PayloadAction<leaderboardType>) => {
          state.lead.leaderboard = action.payload;
          const wins =
            state.lead.leaderboard.find(
              (player) => player.name === state.gamer?.user?.userName
            )?.wins ?? 0;
          const rank = state.matchs?.matchsHistory?.length ?? 0;
          state.gamer = {
            ...state.gamer,
            wins: wins,
            rank: rank,
          };
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
          state.gamer = {
            ...state.gamer,
            totalmatch: state.matchs.matchsHistory.length,
          };
          state.matchs.isLoading = false;
        }
      )
      .addCase(getuserasgamer.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = "action.payload.data.message";
      })
      .addCase(getLeaderboard.rejected, (state) => {
        state.lead.isLoading = false;
      })
      .addCase(getMatchHistory.rejected, (state) => {
        state.matchs.isLoading = false;
      });
  },
});

export const { setToNoError } = profileSlice.actions;
/** in rootReducer = combineReducers as LeaderBoard */
export default profileSlice.reducer;
