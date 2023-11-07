import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { I_Discussion } from "./types";

export interface roomState {
  currentConversation: I_Discussion | null;
}
const initialState: roomState = {
  currentConversation: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentConversation: (state, action: PayloadAction<I_Discussion>) => {
      state.currentConversation = action.payload;
    },
  },
});

export const { setCurrentConversation } = chatSlice.actions;

export default chatSlice.reducer;
