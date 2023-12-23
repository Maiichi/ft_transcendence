import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getUserFriends } from "./friendThunk";
import { I_User } from "../../../../core";

export interface friendState {
  friends: I_User | null;
  isLoading: boolean;
}

const initialState: friendState = {
  friends: null,
  isLoading: false,
};

export const friendSlice = createSlice({
  name: "firends",
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserFriends.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserFriends.fulfilled, (state, action) => {
        state.friends = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserFriends.rejected, (state, action) => {
        state.friends = null;
        state.isLoading = false;
      });
  },
});

export const {  } = friendSlice.actions;

export default friendSlice.reducer;
