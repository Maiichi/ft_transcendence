import { createAsyncThunk } from "@reduxjs/toolkit";
import { GameslogType } from "../statsType";
import { RootState } from "../../../../core/redux";
import { apiRequest } from "../../../../core/utils/apiRequest";

// TODO: userID usage to get history of other (friend)
const getMatchHistory = createAsyncThunk(
  "profile/matchHistory",
  async (
    {
      userID,
      primary = true,
    }: {
      userID: number;
      primary?: boolean;
    },
    { getState }
  ): Promise<GameslogType> => {
    // TODO: is primary then get all, other ways get last 5
    try {
      const token = (getState() as RootState).auth.token;
      const { data }: { data: GameslogType } = await apiRequest(
        `/game/history`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data ?? [];
    } catch (error) {
      console.error("error matchs history fetching", error);
      throw error;
    }
  }
);
export { getMatchHistory };
