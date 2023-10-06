import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getChatRoomMessages, getMemberships } from "./roomThunk";
import { I_ConversationMessages, I_Room } from "../../Types/types";

export interface roomState {
  memberships: I_Room[];
  messages: I_ConversationMessages[];
  isConversation: boolean;
  isLoading: boolean;
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
  isConversation: false,
  isLoading: false,
};

export const roomSlice = createSlice({
  name: "memberships",
  initialState,
  reducers: {
    createRoom: (state, action: PayloadAction<RoomPayload>) => {
      state.isLoading = true;
    },
    createRoomSuccess: (state, action: PayloadAction<I_Room>) => {
      state.memberships.push(action.payload);
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
    },
    removeMembership: (state, action: PayloadAction<I_Room>) => {
      state.memberships.splice(
        state.memberships.findIndex(
          (membership) => membership.id === action.payload.id
        ),
        1
      );
      console.log("(removeMembership) new state ==", state.memberships);
    },
    setIsConversation: (state, action: PayloadAction<boolean>) => {
      state.isConversation = action.payload;
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
  setIsConversation,
  setMemberships,
  setMessages,
  addMembership,
  removeMembership,
  createRoom,
  createRoomSuccess,
} = roomSlice.actions;

export default roomSlice.reducer;