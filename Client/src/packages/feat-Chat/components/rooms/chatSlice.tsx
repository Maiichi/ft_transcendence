import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getChatRoomMessages, getChatRooms } from "./chatThunk";

export interface roomState {
    memberships : [];
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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChatRooms.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getChatRooms.fulfilled, (state, action) => {
                state.memberships = action.payload;
                state.isLoading = false;
            })
            .addCase(getChatRooms.rejected , (state) => {
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

export const { setMemberships, setMessages } = roomSlice.actions;

export default roomSlice.reducer;