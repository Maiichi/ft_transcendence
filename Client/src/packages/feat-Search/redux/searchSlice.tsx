import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getAllRooms } from "./searchThunk";
import { I_Room_Search } from "../types/types";

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
      // console.log('action payload ===', action.payload)
      state.rooms.map((item: I_Room_Search) => {
        // console.log('item id ==', item.id);
        if (item.id == action.payload.id) item.members = action.payload.members;
      });
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
      });
  },
});

export const { joinRoom, setRoomJoined } = searchSlice.actions;

export default searchSlice.reducer;
