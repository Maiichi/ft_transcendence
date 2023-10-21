import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getChatRoomMessages, getMemberships } from "./roomThunk";
import { I_ConversationMessages, I_Room } from "../../Types/types";
export interface roomState {
  memberships: I_Room[];
  messages: I_ConversationMessages[];
  isLoading: boolean;
  errors: any;
}
type RoomPayload = {
  name: string;
  type: string;
  description: string;
  password: string;
  ownerId: string;
};
const initialState: roomState = {
  memberships: [],
  messages: [],
  isLoading: false,
  errors: null,
};

export const roomSlice = createSlice({
  name: "memberships",
  initialState,
  reducers: {
    createRoom: (state, action: PayloadAction<RoomPayload>) => {
      state.isLoading = true;
    },
    // createRoomSuccess: (state, action: PayloadAction<I_Room>) => {
    //   state.memberships.push(action.payload);
    //   state.errors = null;
    // },
    createRoomError: (state, action: PayloadAction<string>) => {
      state.errors = action.payload;
    },
    leaveRoom: (state, action: PayloadAction<number>) => {
      state.isLoading = true;
    },
    setMemberships: (state, action: PayloadAction<roomState>) => {
      state.memberships = action.payload.memberships;
    },
    setMessages: (state, action: PayloadAction<roomState>) => {
      state.messages = action.payload.messages;
    },
    addMembership: (state, action: PayloadAction<I_Room>) => {
      // Add the new membership to the existing memberships array
      state.memberships.push(action.payload);
      state.errors = null;
    },
    removeMembership: (state, action: PayloadAction<number>) => {
      state.memberships.splice(
        state.memberships.findIndex(
          (membership) => membership.id === action.payload,
        ),
      );
      console.log("(removeMembership) new state ==", state.memberships);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMemberships.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMemberships.fulfilled, (state, action) => {
        state.memberships = action.payload;
        state.isLoading = false;
      })
      .addCase(getMemberships.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getChatRoomMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChatRoomMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.isLoading = false;
      })
      .addCase(getChatRoomMessages.rejected, (state) => {
        state.messages = [];
        state.isLoading = false;
      });
  },
});

export const {
  setMemberships,
  setMessages,
  addMembership,
  removeMembership,
  createRoom,
  leaveRoom,

  createRoomError,
} = roomSlice.actions;

export default roomSlice.reducer;
