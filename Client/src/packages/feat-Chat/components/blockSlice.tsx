import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { I_User } from "./types";
import { getBlacklist } from "./blockThunk";

export interface blockState {
    blockedByYou: I_User[];
    blockedYou: I_User[];
    isLoading: boolean;
}
const initialState: blockState = {
    blockedByYou:  [],
    blockedYou: [],
    isLoading: false,
};

export const blockSlice = createSlice({
  name: "block",
  initialState,
  reducers: {
    blockUser :(state, action: PayloadAction<any>) => {
        state.isLoading = false;
    },
    userBlockedByMe: (state, action: PayloadAction<I_User>) => {
        state.blockedByYou.unshift(action.payload);
    },
    userBlockedMe: (state, action: PayloadAction<I_User>) => {
        state.blockedYou.unshift(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlacklist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlacklist.fulfilled, (state, action) => {
        state.blockedByYou = action.payload?.BlockedByYou;  
        state.blockedYou = action.payload?.BlockedYou;
        state.isLoading = false;
      })
      .addCase(getBlacklist.rejected, (state) => {
        state.isLoading = false;
      })
  }
});

export const {
    blockUser,
    userBlockedByMe,
    userBlockedMe,
} = blockSlice.actions;

export default blockSlice.reducer;
