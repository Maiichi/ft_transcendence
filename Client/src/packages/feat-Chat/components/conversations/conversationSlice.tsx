import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getDirectConversationMessages, getDirectConversations } from "./conversationThunk";

export interface conversationState {
    conversations : [];
    messages: [],
    isLoad : boolean
}

const initialState: conversationState = {
    conversations: [],
    messages: [],
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
        setMessages: (state, action: PayloadAction<conversationState>) => 
        {
            state.messages = action.payload.messages;
        }
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
            .addCase(getDirectConversationMessages.pending, (state) => {
                state.isLoad = true;
            })
            .addCase(getDirectConversationMessages.fulfilled, (state, action) => {
                state.messages = action.payload;
                state.isLoad = false;
            })
            .addCase(getDirectConversationMessages.rejected, (state) =>{
                state.isLoad = false;
            })
    },
});

export const { setConversations } = conversationSlice.actions;

export default conversationSlice.reducer;