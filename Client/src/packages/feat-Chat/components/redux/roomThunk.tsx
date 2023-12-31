import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../../../core/utils/apiRequest";
import { RootState } from "../../../../core";

export const getMemberships = createAsyncThunk(
  "chat/memberships",
  async (_, { getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const response = await apiRequest(`/chat/memberships`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("error in chatThunk", error);
      throw error;
    }
  }
);

export const getChatRoomMessages = createAsyncThunk(
  "chat/room/messages",
  async (roomId: number, { getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const resp = await apiRequest(`/chat/room/${roomId}/conversation`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data.messages;
    } catch (error) {
      console.log("error in getChatRoomMessages", error);
      throw error;
    }
  }
);
