import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { I_DirectConversation, I_ConversationMessages } from "../types";
import {
  getDirectConversationMessages,
  getDirectConversations,
} from "./directMessageThunk";

export interface S_DirectMessages {
  conversations: I_DirectConversation[];
  conversationsContent: I_ConversationMessages[];
  isLoad: boolean;
}

type MessagePayload = {
  receiverId: number;
  content: string;
};

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
    createDirectConversation: (
      state,
      action: PayloadAction<MessagePayload>
    ) => {
      state.isLoad = false;
    },
    removeConversation: (state, action: PayloadAction<number>) => {
      const intraId = action.payload;
      const conversationIndex = state.conversations.findIndex(
        (conversation: I_DirectConversation) =>
          conversation.receiver.intraId === intraId
      );
      state.conversations.splice(conversationIndex, 1);
    },
    sendMessageToUser: (state, action: PayloadAction<I_DirectConversation>) => {
      const conversationId = action.payload.id;
      const isConversationFound = state.conversations.find(
        (conversation) => conversation.id === conversationId
      );
      if (isConversationFound) {
        state.conversations.splice(
          state.conversations.findIndex(
            (conversation: I_DirectConversation) =>
              conversation.id === conversationId
          ),
          1,
          action.payload
        );
      } else state.conversations.push(action.payload);
    },
    addMessageToConversation: (
      state,
      action: PayloadAction<I_ConversationMessages>
    ) => {
      state.conversationsContent.push(action.payload);
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
        // state.conversationsContent.push(action.payload);
        state.isLoad = false;
        state.conversationsContent = action.payload;
      })
      .addCase(getDirectConversationMessages.rejected, (state) => {
        state.isLoad = false;
      });
  },
});

export const {
  setConversations,
  createDirectConversation,
  sendMessageToUser,
  addMessageToConversation,
  removeConversation,
} = DirectMessageSlice.actions;

export default DirectMessageSlice.reducer;
