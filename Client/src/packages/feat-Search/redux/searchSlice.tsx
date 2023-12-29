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
    removeRoom: (state, action: PayloadAction<number>) => {
      const roomIndex = state.rooms.findIndex((room) => room.id === action.payload);
      console.log("roomIndex (removeRoom) == ", roomIndex);
      if (roomIndex != -1)
        state.rooms.splice(roomIndex, 1);
    },
    setRoomUpdated: (state, action: PayloadAction<any>) => {
      const roomIndex = state.rooms.findIndex((room) => room.id === action.payload.id);
      state.rooms[roomIndex].name = action.payload.name;
      state.rooms[roomIndex].type = action.payload.type;
      state.rooms[roomIndex].password = action.payload.password;
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

export const { joinRoom, setRoomJoined, setRoomLeaved, addRoom, removeRoom, setRoomUpdated } =
  searchSlice.actions;

export default searchSlice.reducer;
