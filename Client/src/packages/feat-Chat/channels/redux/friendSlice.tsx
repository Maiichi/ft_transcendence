import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../components/types";
import { getUserFriends } from "./friendThunk";

export interface friendState {
  friends: User | null;
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
    getFriends: (state, action: PayloadAction<any>) => {
      state.friends = action.payload;
    },
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

export const { getFriends } = friendSlice.actions;

export default friendSlice.reducer;
