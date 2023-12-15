import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../../core";
import { apiRequest } from "../../../../core/utils/apiRequest";

export const getBlacklist = createAsyncThunk(
  "block/blacklist",
  async (_, { getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const response = await apiRequest(`/users/blacklist`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response data (blacklist) ==", response);
      return response;
    } catch (error) {
      console.log("error in blockThunk", error);
      throw error;
    }
  }
);
