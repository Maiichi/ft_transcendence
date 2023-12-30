import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { getBlacklist } from "./blockThunk";
import { I_User } from "../../../../core";

export interface blockState {
  blockedByYou: I_User[];
  blockedYou: I_User[];
  isLoading: boolean;
}
const initialState: blockState = {
  blockedByYou: [],
  blockedYou: [],
  isLoading: false,
};

export const blockSlice = createSlice({
  name: "block",
  initialState,
  reducers: {
    blockUser: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },
    unblockUser: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },
    userBlockedByMe: (state, action: PayloadAction<I_User>) => {
      state.blockedByYou.unshift(action.payload);
    },
    userBlockedMe: (state, action: PayloadAction<I_User>) => {
      state.blockedYou.unshift(action.payload);
    },
    userUnblockedByMe: (state, action: PayloadAction<I_User>) =>{
      const userIndex = state.blockedByYou.findIndex((user) => user.intraId === action.payload.intraId);
      state.blockedByYou.splice(userIndex, 1);
    },
    userUnblockedMe : (state, action: PayloadAction<I_User>) => {
      const userIndex = state.blockedYou.findIndex((user) => user.intraId === action.payload.intraId);
      state.blockedYou.splice(userIndex, 1);
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
      });
  },
});

export const { 
  unblockUser, 
  blockUser, 
  userBlockedByMe, 
  userBlockedMe, 
  userUnblockedByMe, 
  userUnblockedMe,
} =
  blockSlice.actions;

export default blockSlice.reducer;
