import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../core";
import { apiRequest } from "../../../core/utils/apiRequest";

export const getAllRooms = createAsyncThunk(
  "search/rooms",
  async (_, { getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const res = await apiRequest(`/chat/rooms`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("resp ==", JSON.stringify(res));
      return res;
    } catch (error) {
      console.log("error in getAllRooms");
      throw error;
    }
  }
);
