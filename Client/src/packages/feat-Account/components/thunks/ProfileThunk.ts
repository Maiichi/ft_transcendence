import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../../../core/utils/apiRequest";
import { RootState } from "../../../../core";
import {
  AchievementType,
  MatchHistoryType,
  gamerType,
  unformalData,
  userType,
} from "../statsType";
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
        }, 500);
      });
    } catch (error) {
      console.error("error achievements fetching", error);
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
      console.error("error matchs history fetching", error);
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
      console.error("error subofgamer fetching", error);
      throw error;
    }
  }
);
const getUser = createAsyncThunk(
  "profile/user",
  async (uid: number, { getState }): Promise<userType> => {
    try {
      const token = (getState() as RootState).auth.token;
      console.log(token);
      const userresponse: userType = await apiRequest(`/users/byid/${uid}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return userresponse;
    } catch (error) {
      console.error("error user fetching", error);
      throw error;
    }
  }
);

const getuserasgamer = createAsyncThunk(
  "profile/gamer",
  async (uid: number, { dispatch }): Promise<unformalData> => {
    try {
      const _matchHistory = await dispatch(getMatchHistory(uid));
      const _achievement = await dispatch(getAchievements(uid));
      const _gamer = await dispatch(getGamer(uid));
      const _user = await dispatch(getUser(uid));
      dispatch(getLeaderboard());

      const result: unformalData = {
        gamer: _gamer.payload as gamerType,
        user: _user.payload as userType,
        matchHistory: _matchHistory.payload as MatchHistoryType[],
        achievement: _achievement.payload as AchievementType[],
      };
      return result;
    } catch (error) {
      console.error("error gamer fetching", error);
      throw error;
    }
  }
);

export { getuserasgamer };
