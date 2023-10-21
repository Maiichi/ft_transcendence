import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../../core/utils/apiRequest";
import { RootState } from "../../../core";
import { Logo } from "../images_uploads";
import { leaderboardType } from "./ProfileSlice";

const TopPlayersArr: leaderboardType[] = [
  {
    name: "Lionnel",
    ladder: 100,
    wins: 50,
    loss: 10,
    achievement: Logo,
    picture: "Pic,",
  },
  {
    name: "mark",
    ladder: 90,
    wins: 40,
    loss: 15,
    achievement: Logo,
    picture: "Pic,",
  },
  {
    name: "john",
    ladder: 75,
    wins: 50,
    loss: 40,
    achievement: Logo,
    picture: "Pic,",
  },
];


const getLeaderboard = createAsyncThunk(
  "profile/leaderboard",
  async (_, { getState }): Promise<leaderboardType[] | undefined> => {
    try {
      // const token = (getState() as RootState).auth.token;
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
