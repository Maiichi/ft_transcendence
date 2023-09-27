import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  I_DirectConversation,
  I_ConversationMessages,
} from "../../Types/types";
import {
  getDirectConversationMessages,
  getDirectConversations,
} from "./directMessageThunk";

export interface S_DirectMessages {
  conversations: I_DirectConversation[];
  conversationsContent: I_ConversationMessages[];
  isLoad: boolean;
}

const initialState: S_DirectMessages = {
  conversations: [],
  conversationsContent: [],
  isLoad: false,
};

export const DirectMessageSlice = createSlice({
  name: "directMessages",
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<S_DirectMessages>) => {
      state.conversations = action.payload.conversations;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDirectConversations.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(getDirectConversations.fulfilled, (state, action) => {
        state.conversations = action.payload;
        state.isLoad = false;
      })
      .addCase(getDirectConversations.rejected, (state) => {
        state.isLoad = false;
      })
      .addCase(getDirectConversationMessages.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(getDirectConversationMessages.fulfilled, (state, action) => {
        state.conversationsContent.push(action.payload);
        state.isLoad = false;
      })
      .addCase(getDirectConversationMessages.rejected, (state) => {
        state.isLoad = false;
      });
  },
});

export const { setConversations } = DirectMessageSlice.actions;

export default DirectMessageSlice.reducer;
