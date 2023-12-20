import { createAsyncThunk } from "@reduxjs/toolkit";
import { GameslogType } from "../statsType";

const getMatchHistory = createAsyncThunk(
  "profile/matchHistory",
  async ({
    userID,
    primary = true,
  }: {
    userID: number;
    primary?: boolean;
  }): Promise<GameslogType> => {
    // TODO: is primary then get all, other ways get last 5
    try {
      const matchs: GameslogType = Object.values(
        await require("../../static-data/MatchesHistory.json").matchs
      );
      return matchs;
    } catch (error) {
      console.error("error matchs history fetching", error);
      throw error;
    }
  }
);
export { getMatchHistory };
