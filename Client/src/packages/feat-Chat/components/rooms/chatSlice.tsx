import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createRoom, getChatRoomMessages, getChatRooms } from "./chatThunk";

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
        },
        // addMembership: (state, action: PayloadAction<RoomPayload>) => {
        //     // Add the new membership to the existing memberships array
        //     state.memberships.push(action.payload);
        // },
        // createRoom: (state, action: PayloadAction<roomState>) => {
        //     state.rooms.push(action.payload);
        // }
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
            // .addCase(createRoom.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.rooms.push(action.payload);
            // })            
            // .addCase(createRoom.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(createRoom.rejected, (state) => {
            //     state.isLoading = false;
            // })
    },
});

export const { setMemberships, setMessages } = roomSlice.actions;

export default roomSlice.reducer;