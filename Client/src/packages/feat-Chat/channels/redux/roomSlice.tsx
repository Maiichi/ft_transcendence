import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
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
    removeMemberFromRoom: (state, action: PayloadAction<any>) => {
      const { userId, roomId } = action.payload;
      const isMembershipFound: I_Room | undefined = state.memberships.find(
        (membership: I_Room) => membership.id === roomId,
      );
      if (isMembershipFound) {
        const memberIndex = isMembershipFound.members.findIndex(
          (member) => member.user.intraId == userId,
        );
        if (memberIndex !== -1) {
          state.memberships.map((membership: I_Room) => {
            if (membership.id == roomId) {
              membership.members.splice(memberIndex, 1);
            }
          });
        }
      }
      console.log("newState (before)===", current(state.memberships));
      console.log("newState ===", current(state.memberships));
    },
    addMemberToRoom: (state, action: PayloadAction<any>) => {
      // console.log("addMemberToRoom (payload) ==", action.payload);
      const { roomId, user } = action.payload;
      state.isLoading = true;
      const membership = state.memberships.find((m) => m.id === roomId);
      if (membership) {
        membership.members.push(user);
      }
      // state.memberships.map((membership) => {
      //   if (membership.id == action.payload.roomId)
      //     membership.members.push(action.payload.user);
      // });
      // console.log("newState ===", current(state.memberships));
    },
    addMembership: (state, action: PayloadAction<I_Room>) => {
      // Add the new membership to the existing memberships array
      state.memberships.unshift(action.payload);
      state.errors = null;
    },
    removeMembership: (state, action: PayloadAction<number>) => {
      state.memberships.splice(
        state.memberships.findIndex(
          (membership: I_Room) => membership.id === action.payload,
        ),
        1,
      );
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
  addMemberToRoom,
  createRoom,
  leaveRoom,
  removeMemberFromRoom,

  createRoomError,
} = roomSlice.actions;

export default roomSlice.reducer;
