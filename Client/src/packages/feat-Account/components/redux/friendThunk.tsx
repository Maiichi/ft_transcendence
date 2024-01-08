import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../../core";
import { apiRequest } from "../../../../core/utils/apiRequest";

export const getUserFriends = createAsyncThunk(
  "friends",
  async (_, { getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const response = await apiRequest(`/users/friends`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getFriendRequests = createAsyncThunk(
  "friendRequests",
  async (_, { getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const response = await apiRequest(`/users/friends/requests-received`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.log("error in friendsThunk", error);
      throw error;
    }
  }
);
