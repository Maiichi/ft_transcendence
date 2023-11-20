import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../../../core/utils/apiRequest";
import { RootState } from "../../../../core";
import { AchievementType, MatchHistoryType, gamerType } from "../statsType";
import { getLeaderboard } from "./LeaderBoardThunk";

const getAchievements = createAsyncThunk(
  "profile/achivs",
  async (userID: number): Promise<AchievementType[]> => {
    try {
      const achivs: AchievementType[] = Object.values(
        await require("../../static-data/Achievements.json")
      );
      return new Promise<AchievementType[]>((resolve) => {
        setTimeout(() => {
          resolve(achivs);
        }, 1000);
      });
    } catch (error) {
      console.log("error achievements fetching", error);
      throw error;
    }
  }
);
const getMatchHistory = createAsyncThunk(
  "profile/matchHistory",
  async (userID: number): Promise<MatchHistoryType[]> => {
    try {
      const matchs: MatchHistoryType[] = Object.values(
        await require("../../static-data/MatchesHistory.json").matchs
      );
      return matchs;
    } catch (error) {
      console.log("error matchs history fetching", error);
      throw error;
    }
  }
);
const getGamer = createAsyncThunk(
  "profile/subofgamer",
  async (uid: number): Promise<gamerType> => {
    try {
      const gamer: gamerType = await require("../../static-data/gamer.json");
      return gamer;
    } catch (error) {
      console.log("error subofgamer fetching", error);
      throw error;
    }
  }
);
const getUser = createAsyncThunk(
  "profile/user",
  async (uid: number, { getState }): Promise<any> => {
    try {
      const token = (getState() as RootState).auth.token;
      const userresponse = await apiRequest(`/users/byid/${uid}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return userresponse;
    } catch (error) {
      console.log("error user fetching", error);
      throw error;
    }
  }
);

type unformalData = {
  gamer: gamerType| unknown;
  user: any;
  matchHistory: MatchHistoryType[]| unknown;
  achievement: AchievementType[]|unknown;
};
const getuserasgamer = createAsyncThunk(
  "profile/gamer",
  async (uid: number, { dispatch }): Promise<unformalData> => {
    try {
      const _matchHistory = await dispatch(getMatchHistory(uid));
      const _achievement = await dispatch(getAchievements(uid));
      const _gamer = await dispatch(getGamer(uid));
      const _user = await dispatch(getUser(uid));
      dispatch(getLeaderboard());

      const result:unformalData = {
        gamer: _gamer.payload,
        user: _user.payload,
        matchHistory: _matchHistory.payload,
        achievement: _achievement.payload,
      };
      return result;
    } catch (error) {
      console.log("error gamer fetching", error);
      throw error;
    }
  }
);

export { getuserasgamer };
