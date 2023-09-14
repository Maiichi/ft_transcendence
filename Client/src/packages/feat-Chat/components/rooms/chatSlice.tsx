import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getChatRoomMessages, getMemberships } from "./chatThunk";
import { Membership } from "../../Types/types";

export interface roomState {
    memberships : Membership[];
    messages: [];
    isConversation:boolean;
    isLoading : boolean,
}

const initialState: roomState = {
    memberships: [],
    messages: [],
    isConversation: false,
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
            state.memberships.push(action.payload);
        },
        removeMembership: (state, action: PayloadAction<Membership>) => {
            state.memberships.splice(state.memberships.findIndex((membership) => membership.id === action.payload.id), 1);
            console.log("(removeMembership) new state ==" , state.memberships);
        },
        setIsConversation: (state, action: PayloadAction<boolean>) => {
            state.isConversation = action.payload;
        }
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
            .addCase(getChatRoomMessages.rejected , (state) => {
                state.messages = [];
                state.isLoading = false;
            })
    },
});

export const { setIsConversation, setMemberships, setMessages, addMembership, removeMembership } = roomSlice.actions;

export default roomSlice.reducer;