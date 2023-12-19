import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { I_Discussion, I_User } from "../types";

export interface roomState {
  currentConversation: I_Discussion | null;
  selectedUser: I_User | null;
  discussionsDisplay: boolean;
  chatBoxDisplay: boolean;
}
const initialState: roomState = {
  currentConversation: null,
  selectedUser: null,
  discussionsDisplay: true,
  chatBoxDisplay: true,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentConversation: (state, action: PayloadAction<I_Discussion>) => {
      state.currentConversation = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<I_User>) => {
      state.selectedUser = action.payload;
    },
    setDiscussionsDisplay: (state, action: PayloadAction<boolean>) => {
      state.discussionsDisplay = action.payload;
    },
    setChatBoxDisplay: (state, action: PayloadAction<boolean>) => {
      state.chatBoxDisplay = action.payload;
    },
  },
});

export const {
  setDiscussionsDisplay,
  setCurrentConversation,
  setSelectedUser,
  setChatBoxDisplay,
} = chatSlice.actions;

export default chatSlice.reducer;
