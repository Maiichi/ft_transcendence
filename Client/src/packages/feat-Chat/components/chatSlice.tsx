import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { I_Discussion } from "./types";

export interface roomState {
  currentConversation: I_Discussion | null;
  selectedUserId: number | null;
}
const initialState: roomState = {
  currentConversation: null,
  selectedUserId: null
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentConversation: (state, action: PayloadAction<I_Discussion>) => {
      state.currentConversation = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<number>) => {
      state.selectedUserId = action.payload;
    }
  },
});

export const { setCurrentConversation, setSelectedUser } = chatSlice.actions;

export default chatSlice.reducer;
