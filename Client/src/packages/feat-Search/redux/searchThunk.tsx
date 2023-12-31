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

      return res;
    } catch (error) {
      console.log("error in getAllRooms");
      throw error;
    }
  }
);
export const getAllUsers = createAsyncThunk(
  "search/users",
  async (_, { getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const res = await apiRequest(`/users/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.log("error in getAllUsers");
      throw error;
    }
  }
);
