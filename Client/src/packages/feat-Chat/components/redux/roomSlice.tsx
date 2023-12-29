import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getChatRoomMessages, getMemberships } from "./roomThunk";
import { I_ConversationMessages,  I_Room } from "../types";

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

type MessagePayload = {
  senderId: number;
  roomId: number;
  content: string;
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
    updateRoom: (state, action: PayloadAction<RoomPayload>) => {
      state.isLoading = true;
    },
    updateRoomSucess: (state, action: PayloadAction<I_Room>) => {
      const index = state.memberships.findIndex(
        (item: I_Room) => (item.id === action.payload.id)
      );
      state.memberships[index].name = action.payload.name;
      state.memberships[index].type = action.payload.type;
      state.memberships[index].password = action.payload.password;
      state.memberships[index].description = action.payload.description;
    },

    createRoomError: (state, action: PayloadAction<string>) => {
      state.errors = action.payload;
    },
    leaveRoom: (state, action: PayloadAction<number>) => {
      state.isLoading = false;
    },
    setMemberships: (state, action: PayloadAction<roomState>) => {
      state.memberships = action.payload.memberships;
    },
    addUserToRoom: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },
    setMessages: (state, action: PayloadAction<roomState>) => {
      state.messages = action.payload.messages;
    },
    removeMemberFromRoom: (state, action: PayloadAction<any>) => {
      const { userId, roomId } = action.payload;
      const isMembershipFound: I_Room | undefined = state.memberships.find(
        (membership: I_Room) => membership.id === roomId
      );
      if (isMembershipFound) {
        const memberIndex = isMembershipFound.members.findIndex(
          (member) => member.user.intraId == userId
        );
        if (memberIndex !== -1) {
          isMembershipFound.members.splice(memberIndex, 1);
        }
      }
      state.memberships.map((membership: any) => {
        if (membership.id == roomId) {
          membership = isMembershipFound;
        }
      });
    },
    addMemberToRoom: (state, action: PayloadAction<any>) => {
      state.memberships.map((membership) => {
        if (membership.id == action.payload.roomId)
          membership.members.push(action.payload.user);
      });
    },
    addMembership: (state, action: PayloadAction<I_Room>) => {
      // Add the new membership to the existing memberships array
      state.memberships.unshift(action.payload);
      state.errors = null;
    },
    removeMembership: (state, action: PayloadAction<number>) => {
      state.memberships.splice(
        state.memberships.findIndex(
          (membership: I_Room) => membership.id === action.payload
        ),
        1
      );
    },
    sendMessageToRoom: (state, action: PayloadAction<MessagePayload>) => {
      state.isLoading = false;
    },
    addMessageToRoom: (state, action: PayloadAction<any>) => {
      state.messages.push(action.payload);
    },
    setAdminRoom: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },
    addAdminToRoom: (state, action: PayloadAction<any>) => {
      const { userId, roomId } = action.payload;
      const roomIndex = state.memberships.findIndex(
        (item) => item.id === roomId
      );
      const userIndex = state.memberships[roomIndex].members.findIndex(
        (member) => member.user.intraId === userId
      );
      state.memberships[roomIndex].members[userIndex].isAdmin = true;
    },
    unSetAdminRoom: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },
    RemoveAdminFromRoom: (state, action: PayloadAction<any>) => {
      const { userId, roomId } = action.payload;
      const roomIndex = state.memberships.findIndex(
        (item) => item.id === roomId
      );
      const userIndex = state.memberships[roomIndex].members.findIndex(
        (member) => member.user.intraId === userId
      );
      state.memberships[roomIndex].members[userIndex].isAdmin = false;
    },
    banMember: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },
    banMemberFromRoom: (state, action: PayloadAction<any>) => {
      const { userId, roomId } = action.payload;
      const roomIndex = state.memberships.findIndex(
        (item) => item.id === roomId
      );
      const userIndex = state.memberships[roomIndex].members.findIndex(
        (member) => member.user.intraId === userId
      );
      state.memberships[roomIndex].members[userIndex].isBanned = true;
    },
    unBanMember: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },
    unBanMemberFromRoom: (state, action: PayloadAction<any>) => {
      const { userId, roomId } = action.payload;
      const roomIndex = state.memberships.findIndex(
        (item) => item.id === roomId
      );
      const userIndex = state.memberships[roomIndex].members.findIndex(
        (member) => member.user.intraId === userId
      );
      state.memberships[roomIndex].members[userIndex].isBanned = false;
    },
    muteMember: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },
    muteMemberInRoom: (state, action: PayloadAction<any>) => {
      const { userId, roomId, timeMute } = action.payload;
      const roomIndex = state.memberships.findIndex(
        (item) => item.id === roomId
      );
      const userIndex = state.memberships[roomIndex].members.findIndex(
        (member) => member.user.intraId === userId
      );
      // Calculate the time to mute
      const currentTime = new Date();

      const minutesToMute = new Date(
        currentTime.getTime() + (timeMute + 60) * 60000
      ); // Con
      state.memberships[roomIndex].members[userIndex].timeMute = minutesToMute;
    },
    kickMember: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },
    kickMemberFromRoom: (state, action: PayloadAction<any>) => {
      const { userId, roomId } = action.payload;
      const roomIndex = state.memberships.findIndex(
        (item) => item.id === roomId
      );
      const userIndex = state.memberships[roomIndex].members.findIndex(
        (member) => member.user.intraId === userId
      );
      state.memberships[roomIndex].members.splice(userIndex, 1);
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
  addUserToRoom,
  createRoom,
  leaveRoom,
  removeMemberFromRoom,
  updateRoom,
  createRoomError,
  updateRoomSucess,
  sendMessageToRoom,
  addMessageToRoom,
  setAdminRoom,
  addAdminToRoom,
  banMember,
  banMemberFromRoom,
  muteMember,
  muteMemberInRoom,
  unSetAdminRoom,
  RemoveAdminFromRoom,
  unBanMember,
  unBanMemberFromRoom,
  kickMember,
  kickMemberFromRoom,
} = roomSlice.actions;

export default roomSlice.reducer;
