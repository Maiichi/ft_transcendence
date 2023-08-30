import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getDirectConversations } from "./conversationThunk";

export interface conversationState {
    conversations : [];
    isLoad : boolean
}

const initialState: conversationState = {
    conversations: [],
    isLoad: false
};

export const conversationSlice = createSlice({
    name: "conversations",
    initialState,
    reducers : {
        setConversations: (state, action: PayloadAction<conversationState>) => 
        {
            state.conversations = action.payload.conversations;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDirectConversations.pending, (state) => {
                state.isLoad = true;
            })
            .addCase(getDirectConversations.fulfilled, (state, action) =>{
                state.conversations = action.payload;
                state.isLoad = false;
            })
            .addCase(getDirectConversations.rejected, (state) =>{
                state.isLoad = false;
            })
    },
});

export const { setConversations } = conversationSlice.actions;

export default conversationSlice.reducer;