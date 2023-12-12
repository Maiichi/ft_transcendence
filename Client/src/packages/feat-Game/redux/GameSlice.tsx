import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface GameState {
    inviteReceived : boolean;
    inviteSent: boolean;
    // acceptOpponentInvite: boolean;
    // declineOpponentInvite: boolean;
    inviteAccepted: boolean;
    inviteDeclined: boolean;
    isLoading: boolean;
}
const initialState: GameState = {
    inviteReceived: false,
    inviteSent: false,
    // acceptOpponentInvite: false,
    // declineOpponentInvite: false,
    inviteAccepted: false,
    inviteDeclined: false,
    isLoading: false,
};

export const GameSlice = createSlice({
  name: "Game",
  initialState,
  reducers: {
    inviteUserToGame :(state, action: PayloadAction<any>) => {
        state.inviteSent = action.payload;
    },
    receiveGameInvitation : (state, action: PayloadAction<any>) => {
      state.inviteReceived = action.payload;
    },
    clearGameInvitation: (state) => {
      state.inviteReceived = false;
    },
    // setAcceptOpponentInvite : (state , action: PayloadAction<any>) => {
    //   state.acceptOpponentInvite = action.payload;
    // },
    // setDeclineOpponentInvite : (state , action: PayloadAction<any>) => {
    //   state.declineOpponentInvite = action.payload;
    // },
    setInviteAccepted : (state, action: PayloadAction<any>) => {
      state.inviteAccepted = action.payload;
    },
    setInviteDeclined : (state, action: PayloadAction<any>) => {
      state.inviteDeclined = action.payload;
    }
    
  },
});

export const {
    inviteUserToGame,
    receiveGameInvitation,
    clearGameInvitation,
    // setAcceptOpponentInvite,
    // setDeclineOpponentInvite,
    setInviteAccepted,
    setInviteDeclined
} = GameSlice.actions;

export default GameSlice.reducer;
