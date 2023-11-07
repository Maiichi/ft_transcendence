import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getUserFriends } from "./friendThunk";

export interface friendState {
    friends: any;
    isLoading: boolean;
}

const initialState: friendState = {
    friends: [],
    isLoading: false,
}

export const friendSlice = createSlice({
    name: "firends",
    initialState,
    reducers: {
        getFriends: (state, action: PayloadAction<any>) => {
            state.friends = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserFriends.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserFriends.fulfilled, (state, action)=> {
                console.log('fullfiled payload ==', action.payload)
                state.friends =  action.payload;
                state.isLoading = false;
            })
            .addCase(getUserFriends.rejected, (state, action) => {
                state.friends = [];
                state.isLoading = false;
            })
    }
});

export const { getFriends } = friendSlice.actions;

export default friendSlice.reducer;
