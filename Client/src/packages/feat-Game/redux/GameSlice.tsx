import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { I_User } from "../../../core";
import { STEPS } from "../utils/constants";

export interface GameState {
    inviter: I_User | null;
    invited: I_User | null;
    inviteReceived: boolean;
    inviteSent: boolean;
    // acceptOpponentInvite: boolean;
    // declineOpponentInvite: boolean;
    inviteAccepted: boolean;
    inviteDeclined: boolean;
    chatInvite: boolean;
    isLoading: boolean;
    currentTab: boolean;
    currentStep: string;
    gameMode: string;
    countdown: number | null;
}

const initialState: GameState = {
    inviter: null,
    invited: null,
    inviteReceived: false,
    inviteSent: false,
    // acceptOpponentInvite: false,
    // declineOpponentInvite: false,
    inviteAccepted: false,
    inviteDeclined: false,
    chatInvite: false,
    isLoading: false,
    currentTab: false,
    currentStep: STEPS.SELECT_MAP,
    gameMode: "dual",
    countdown: null,
};


export const GameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        inviteToGame: (state, action: PayloadAction<any>) => {
            // state.invited = action.payload.invited;
            // state.inviter = action.payload.inviter;
        },
        setInviteSent: (state, action: PayloadAction<boolean>) => {
            state.inviteSent = action.payload;
        },
        setInviteReceived: (state, action : PayloadAction<boolean>) => {
            state.inviteReceived = action.payload;
        },
        setInviteAccepted: (state, action: PayloadAction<boolean>) => {
            state.inviteAccepted = action.payload;
        },
        setInviteDeclined: (state, action: PayloadAction<boolean>) => {
            state.inviteDeclined = action.payload;
        },
        setInviter: (state, action: PayloadAction<I_User | null>) => {
            state.inviter = action.payload;
        },
        setInvited: (state, action: PayloadAction<I_User | null>) =>{
            state.invited = action.payload;
        },

        declineGameInvitation: (state, action: PayloadAction<any>) => {

        },
        acceptGameInvitation: (state, action: PayloadAction<any>) => {

        },
        setCurrentTab : (state, action: PayloadAction<boolean>) =>{
            state.currentTab = action.payload;
        },
        // for game UI
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
        resetGameState: (state) => {
            state.inviter = null;
            state.invited = null;
            state.inviteReceived = false;
            state.inviteSent = false; 
            state.inviteAccepted = false;
            state.inviteDeclined= false;
            state.chatInvite= false;
            state.currentTab= false;
            state.currentStep= STEPS.SELECT_MAP;
            state.countdown= null;
            state.gameMode= "dual";
        }
    },
});

export const {
    inviteToGame,
    setInviteSent,
    setInviteReceived,
    setInviteAccepted,
    setInviter,
    setInvited,
    setGameStep,
    resetGame,
    setGameMode,
    setCountdown,
    declineGameInvitation,
    acceptGameInvitation,
    setCurrentTab,
    resetGameState
} = GameSlice.actions;

export default GameSlice.reducer;