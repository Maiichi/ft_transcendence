import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getAllRooms, getAllUsers } from "./searchThunk";
import { I_Room_Search } from "../types/types";
import { userType } from "../../feat-Account/components";

export interface S_Search {
  rooms: I_Room_Search[];
  users: [];
  isLoading: boolean;
}

const initialState: S_Search = {
  rooms: [],
  users: [],
  isLoading: false,
};

type JoinRoomPayload = {
  id: number;
  password: string;
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    joinRoom: (state, action: PayloadAction<JoinRoomPayload>) => {
      state.isLoading = true;
    },
    setRoomJoined: (state, action) => {
      state.rooms.map((item: I_Room_Search) => {
        if (item.id == action.payload.id) item.members = action.payload.members;
      });
    },
    setRoomLeaved: (state, action) => {
      state.rooms.map((room: I_Room_Search) => {
        if (room.id == action.payload.roomId) {
          const memberIndex = room.members.findIndex(
            (member) => member.user.intraId == action.payload.userId
          );
          if (memberIndex !== -1) room.members.splice(memberIndex);
        }
      });
    },
    addRoom: (state, action: PayloadAction<I_Room_Search>) => {
      state.rooms.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllRooms.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
          state.users = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(getAllUsers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { joinRoom, setRoomJoined, setRoomLeaved, addRoom } =
  searchSlice.actions;

export default searchSlice.reducer;
