import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../../../core/utils/apiRequest";
import { RootState } from "../../../../core";
import { leaderboardType } from "../statsType";

const getLeaderboard = createAsyncThunk(
  "profile/leaderboard",
  async (): Promise<leaderboardType[]> => {
    try {
      const Players = require("../../static-data/Players.json").Players;
      const TopPlayersArr: leaderboardType[] = Object.values(Players);
      const response = new Promise<leaderboardType[]>((resolve, reject) => {
        setTimeout(() => {
          resolve(TopPlayersArr);
        }, 1000);
      });
      return response;
    } catch (error) {
      console.log("error leaderboard fetching", error);
      throw error;
    }
  }
);

export { getLeaderboard };
