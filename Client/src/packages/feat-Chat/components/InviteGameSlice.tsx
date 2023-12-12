import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface inviteGameState {
    received : boolean;
    isLoading: boolean;
}
const initialState: inviteGameState = {
    received: false,
    isLoading: false,
};

export const InviteGameSlice = createSlice({
  name: "inviteGame",
  initialState,
  reducers: {
    inviteUserToGame :(state, action: PayloadAction<any>) => {
        state.isLoading = false;
    },
    receiveGameInvitation : (state, action: PayloadAction<any>) => {
      state.received = true;
      state.isLoading = false;
    },
    clearGameInvitation: (state) => {
      state.received = false;
      state.isLoading = false;
    },
  },
});

export const {
    inviteUserToGame,
    receiveGameInvitation,
    clearGameInvitation
} = InviteGameSlice.actions;

export default InviteGameSlice.reducer;
