import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../../core";
import { apiRequest } from "../../../../core/utils/apiRequest";

export const getDirectConversations = createAsyncThunk(
  "conversation/direct",
  async (_, { getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const resp = await apiRequest(`/chat/conversations`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (error) {
      console.log("error in getDirectConversation", error);
      throw error;
    }
  }
);

export const getDirectConversationMessages = createAsyncThunk(
  "conversation/direct/messages",
  async (conversationId: number, { getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const res = await apiRequest(`/chat/${conversationId}/conversation`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.messages;
    } catch (error) {}
  }
);
