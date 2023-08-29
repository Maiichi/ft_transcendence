import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface conversationState {
    memberships : [];
    isLoading : boolean
}

const initialState: conversationState = {
    memberships: [],
    isLoading: false
};

export const conversationSlice = createSlice({
    name: "conversations",
    initialState,
    reducers : {
        setConversation: (state, action: PayloadAction<conversationState>) => 
        {
            state.memberships = action.payload.memberships;
        },
    },
    extraReducers: (builder) => {
        builder
            
    },
});

export const { setConversation } = conversationSlice.actions;

export default conversationSlice.reducer;