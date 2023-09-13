import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createRoom, getChatRoomMessages, getMemberships } from "./chatThunk";
import { Membership } from "../../Types/types";

export interface roomState {
    memberships : Membership[];
    messages: [];
    isLoading : boolean,
}

const initialState: roomState = {
    memberships: [],
    messages: [],
    isLoading: false,
};

export const roomSlice = createSlice({
    name: "memberships",
    initialState,
    reducers : {
        setMemberships: (state, action: PayloadAction<roomState>) => 
        {
            state.memberships = action.payload.memberships;
        },
        setMessages : (state, action: PayloadAction<roomState>) => {
            state.messages = action.payload.messages;
        },
        addMembership: (state, action: PayloadAction<Membership>) => {
            // Add the new membership to the existing memberships array
            console.log("payload inside addMembership ==", action.payload);
            state.memberships.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMemberships.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMemberships.fulfilled, (state, action) => {
                state.memberships = action.payload;
                state.isLoading = false;
            })
            .addCase(getMemberships.rejected , (state) => {
                state.isLoading = false
            })
            .addCase(getChatRoomMessages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getChatRoomMessages.fulfilled, (state, action) => {
                state.messages = action.payload;
                state.isLoading = false;
            })
            .addCase(getChatRoomMessages.rejected , (state, action) => {
                state.messages = [];
                state.isLoading = false;
            })
    },
});

export const { setMemberships, setMessages, addMembership } = roomSlice.actions;

export default roomSlice.reducer;