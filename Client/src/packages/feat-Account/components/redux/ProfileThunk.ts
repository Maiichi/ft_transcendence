import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../../../core/utils/apiRequest";
import { RootState } from "../../../../core";
import { GameslogType, unformalData, userType } from "../statsType";
import { getLeaderboard, getMatchHistory } from ".";

const getAchievements = createAsyncThunk(
  "profile/achivs",
  async (uid: number, { getState }): Promise<{ name: string }[]> => {
    try {
      const token = (getState() as RootState).auth.token;
      const getedAchivs: Array<{ name: string }> = await apiRequest(
        `/game/${uid}/achievements`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return getedAchivs;
    } catch (error) {
      console.error("error achievements fetching", error);
      throw error;
    }
  }
);

const getUser = createAsyncThunk(
  "profile/user",
  async (uid: number, { getState }): Promise<userType> => {
    try {
      const token = (getState() as RootState).auth.token;
      const userresponse: userType = await apiRequest(`/users/byid/${uid}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return userresponse;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

const getuserasgamer = createAsyncThunk(
  "profile/gamer",
  async (uid: number, { dispatch }): Promise<unformalData> => {
    try {
      const _matchHistory = await dispatch(
        getMatchHistory({ userID: uid, primary: false })
      );
      const _achievement = await dispatch(getAchievements(uid));
      const _user: any = await dispatch(getUser(uid));
      dispatch(getLeaderboard());

      const result: unformalData = {
        user: _user.payload as userType,
        matchHistory: _matchHistory.payload as GameslogType,
        achievement: _achievement.payload as { name: string }[],
      };
      if (_user.error)
        throw _user.error
      return result;
    } catch (error) {
      console.error("error gamer fetchinggdfgdfgdfgdfdfg", error);
  
      throw error;
    }
  }
);

export { getuserasgamer };
