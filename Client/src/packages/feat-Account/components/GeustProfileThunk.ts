import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../../core/utils/apiRequest";
import { RootState, useAppSelector } from "../../../core";
import { gamerType } from "./ProfileSlice";

const getuserasgamer = createAsyncThunk(
  "profile/gamer",
  async (
    uid: number,
    { getState, rejectWithValue }
  ): Promise<gamerType | undefined> => {
    try {
      const token = (getState() as RootState).auth.token;
      const userresponse = await apiRequest(`/users/byid/${uid}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response: gamerType = require("../static-data/gamer.json");
      response.user = userresponse;
      return response;
    } catch (error) {
      console.log("error user fetching", error);
    }
  }
);

export { getuserasgamer };
