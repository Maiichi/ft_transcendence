import { createSlice } from "@reduxjs/toolkit";
import { getLeaderboard } from "./ProfileThunk";
import Module from "module";
import { useAppSelector } from "../../../core";

type gamerType = {
  user: any
  coalition: {
    name: string | null
    logo: Module | string 
  },
  rank: number
}
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
  logo: Module
};
type MatchHistoryType = {
  name:string
}

export type { gamerType, leaderboardType, AchievementType, MatchHistoryType }

export interface ProfileState {
  gamer: {
    on: gamerType
    isLoading: boolean
  }
  lead: {
    leaderboard: leaderboardType[] | unknown;
    isLoading: boolean;
  },
  achiv: {
    achievement: AchievementType[] | null
    isLoading: boolean;
  }
  matchs: {
    MatchHistory: MatchHistoryType[] | null
    isLoading: boolean;
  }
}

const initialState: ProfileState = {
  gamer: {
    on: {
      user: null ,
      coalition: {
        name: null,
        logo: ''
      },
      rank: 0
    },
    isLoading: false
  },
  lead: {
    leaderboard: null,
    isLoading: false
  },
  achiv: {
    achievement: null,
    isLoading: false
  },
  matchs: {
    MatchHistory: null,
    isLoading: false
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getuserasgamer(state:ProfileState, action) {
      state.gamer.on.user = action.payload
      state.gamer.on = require('../static-data/gamer.json')
    },
    getMatchsHistory(state:ProfileState){
      state.achiv = require('../static-data/Achievements.json')
    },
    getAchievements(state){
      state.matchs = require('../static-data/MatchesHistory.json')
    }
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
export const { getuserasgamer, getMatchsHistory, getAchievements } = profileSlice.actions;
/** in rootReducer = combineReducers as LeaderBoard */
export default profileSlice.reducer;
