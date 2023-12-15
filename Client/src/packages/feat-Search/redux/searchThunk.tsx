import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../core";
import { apiRequest } from "../../../core/utils/apiRequest";
import { userType } from "../../feat-Account/components";

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

      return res;
    } catch (error) {
      console.log("error in getAllRooms");
      throw error;
    }
  }
);

const getAllFriends = createAsyncThunk(
  "search/users",
  async (_, { getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const res:Array<userType> = [] /*await apiRequest(`/users/friends`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });*/

      return res;
    } catch (error) {
      console.log("error in getAllFriends");
      throw error;
    }
  }
);

export { getAllFriends };
