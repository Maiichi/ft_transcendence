import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { STEPS } from "../utils/constants";

export interface GameState {
    inviterId: number | null;
    invitedId: number | null;
    inviteReceived: boolean;
    inviteSent: boolean;
    acceptOpponentInvite: boolean;
    declineOpponentInvite: boolean;
    inviteAccepted: boolean;
    inviteDeclined: boolean;
    chatInvite: boolean;
    isLoading: boolean;

    currentStep: string;
    gameMode: string;
    countdown: number | null;
}
const initialState: GameState = {
    inviterId: null,
    invitedId: null,
    inviteReceived: false,
    inviteSent: false,
    acceptOpponentInvite: false,
    declineOpponentInvite: false,
    inviteAccepted: false,
    inviteDeclined: false,
    chatInvite: false,
    isLoading: false,

    currentStep: STEPS.SELECT_MAP,
    gameMode: "dual",
    countdown: null,
};

export const GameSlice = createSlice({
    name: "Game",
    initialState,
    reducers: {
        inviteUserToGame: (state, action: PayloadAction<any>) => {
            state.invitedId = action.payload.invitedId;
            state.inviterId = action.payload.inviterId;
        },
        inviteUserToGameFromChat: (state, action: PayloadAction<any>) => {
            state.chatInvite = action.payload;
        },
        receiveGameInvitation: (state, action: PayloadAction<any>) => {
            state.inviteReceived = action.payload;
        },
        clearGameInvitation: (state) => {
            state.inviteReceived = false;
        },
        acceptUserGameInvite: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
        },
        declineUserGameInvite: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
        },
        // need to add DeclinGameInvite
        // setAcceptOpponentInvite : (state , action: PayloadAction<any>) => {
        //   state.acceptOpponentInvite = action.payload;
        // },
        // setDeclineOpponentInvite : (state , action: PayloadAction<any>) => {
        //   state.declineOpponentInvite = action.payload;
        // },
        setInviteAccepted: (state, action: PayloadAction<any>) => {
            state.inviteAccepted = action.payload;
        },
        setInviteDeclined: (state, action: PayloadAction<any>) => {
            state.inviteDeclined = action.payload;
        },
        setInviterId: (state, action: PayloadAction<any>) => {
            state.inviterId = action.payload;
        },
        setInvitedId: (state, action: PayloadAction<any>) => {
            state.invitedId = action.payload;
        },
        opponentAcceptInvite: (state, action: PayloadAction<any>) => {
            state.acceptOpponentInvite = action.payload;
        },
        opponentDeclineInvite: (state, action: PayloadAction<any>) => {
            state.declineOpponentInvite = action.payload;
        },

        setGameStep: (state, action: PayloadAction<any>) => {
            state.currentStep = action.payload;
        },
        setGameMode: (state, action: PayloadAction<any>) => {
            state.gameMode = action.payload;
        },
        resetGame: (state) => {
            state.gameMode = "dual";
            state.currentStep = STEPS.SELECT_MAP;
        },
        setCountdown: (state, action: PayloadAction<any>) => {
            state.countdown = action.payload;
        },
    },
});

export const {
    inviteUserToGame,
    receiveGameInvitation,
    clearGameInvitation,
    // setAcceptOpponentInvite,
    // setDeclineOpponentInvite,
    setInviteAccepted,
    setInviteDeclined,
    inviteUserToGameFromChat,
    acceptUserGameInvite,
    declineUserGameInvite,
    setInviterId,
    setInvitedId,
    opponentAcceptInvite,
    opponentDeclineInvite,

    setGameStep,
    resetGame,
    setGameMode,
    setCountdown,
} = GameSlice.actions;

export default GameSlice.reducer;
