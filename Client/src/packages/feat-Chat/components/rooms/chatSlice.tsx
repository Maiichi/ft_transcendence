import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getChatRooms } from "./chatThunk";

export interface roomState {
    memberships : [];
    isLoading : boolean
}

const initialState: roomState = {
    memberships: [],
    isLoading: false
};

export const roomSlice = createSlice({
    name: "memberships",
    initialState,
    reducers : {
        setConversation: (state, action: PayloadAction<roomState>) => 
        {
            state.memberships = action.payload.memberships;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChatRooms.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getChatRooms.fulfilled, (state, action) => {
                state.memberships = action.payload;
                state.isLoading = false;
            })
            .addCase(getChatRooms.rejected , (state) => {
                state.isLoading = false
            })
    },
});

export const { setConversation } = roomSlice.actions;

export default roomSlice.reducer;