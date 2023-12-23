import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getFriendRequests, getUserFriends } from "./friendThunk";
import { I_User } from "../../../../core";
// export interface FriendRequest {
//   sender: I_User;
//   id: number;
// }
export interface friendState {
  friends: I_User | null;
  friendRequests: I_User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: friendState = {
  friends: null,
  friendRequests: [],
  isLoading: false,
  error: null,
};

export const friendSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    sendFriendRequest: (state, action: PayloadAction<number>) => {
      state.isLoading = false;
    },
    addFriendRequest: (state, action: PayloadAction<I_User>) => {
      state.friendRequests.push(action.payload);
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
      })
      .addCase(getFriendRequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFriendRequests.fulfilled, (state, action) => {
        state.friendRequests = action.payload;
        state.isLoading = false;
      })
      .addCase(getFriendRequests.rejected, (state, action) => {
        state.error = "error";
        state.isLoading = false;
      });
  },
});

export const { addFriendRequest, sendFriendRequest } = friendSlice.actions;

export default friendSlice.reducer;
