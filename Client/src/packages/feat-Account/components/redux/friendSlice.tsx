import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getFriendRequests, getUserFriends } from "./friendThunk";
import { I_User } from "../../../../core";
// export interface FriendRequest {
//   sender: I_User;
//   id: number;
// }
export interface friendState {
  friends: I_User[];
  friendRequests: I_User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: friendState = {
  friends: [],
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
    acceptFriendRequest: (state, action: PayloadAction<number>) => {
      state.isLoading = false;
    },
    declineFriendRequest: (state, action: PayloadAction<number>) => {
      state.isLoading = false;
    },
    addFriend: (state, action: PayloadAction<I_User>) => {
      state.friends.push(action.payload);
    },
    removeFriend: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      state.friends = state.friends.filter(
        (obj) => obj.intraId !== action.payload
      );
    },
    addFriendRequest: (state, action: PayloadAction<I_User>) => {
      state.friendRequests.push(action.payload);
    },
    removeFriendRequest: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      state.friendRequests = state.friendRequests.filter(
        (obj) => obj.intraId !== action.payload
      );
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

export const {
  removeFriendRequest,
  declineFriendRequest,
  acceptFriendRequest,
  addFriendRequest,
  sendFriendRequest,
  addFriend,
  removeFriend,
} = friendSlice.actions;

export default friendSlice.reducer;
