import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../../core/utils/apiRequest";
import { RootState } from "../../../core";
import { Logo } from "../images_uploads";
import { leaderboardType } from "./ProfileSlice";


const getLeaderboard = createAsyncThunk(
  "profile/leaderboard",
  async (_, { getState }): Promise<leaderboardType[] | undefined> => {
    try {
      // const token = (getState() as RootState).auth.token;
      const Players = require('../static-data/Players.json').Players
      const TopPlayersArr:leaderboardType[]  = []
      for (let i = 1; i < 5; i++) {
        if (!Players[i]) break;
        TopPlayersArr.push(Players[i]);
      }
      const response =
        // await apiRequest(`/chat/memberships`, {
        //   method: "GET",
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        new Promise<leaderboardType[]>((resolve, reject) => {
          setTimeout(() => {
            true
              ? resolve(TopPlayersArr)
              : reject("Failed to fetch leaderboard");
          }, 50);
        });
      return response;
    } catch (error) {
      console.log("error leaderboard fetching", error);
    }
  }
);

export { getLeaderboard };
