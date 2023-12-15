import { Middleware } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import {
  ConnectSocket,
  disconnectSocket,
  SocketConnected,
} from "./socketSlice";
import { initializeSocket } from "./socketManager";
import {
  addMembership,
  addMemberToRoom,
  createRoom,
  leaveRoom,
  removeMemberFromRoom,
  removeMembership,
  updateRoom,
  updateRoomSucess,
  addUserToRoom,
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
} from "../../packages/feat-Chat/components/redux/roomSlice";
import { setOpenErrorSnackbar, setServerError } from "../CoreSlice";
import {
  addRoom,
  joinRoom,
  setRoomJoined,
  setRoomLeaved,
} from "../../packages/feat-Search/redux/searchSlice";
import {
  addMessageToConversation,
  createDirectConversation,
  removeConversation,
  sendMessageToUser,
} from "../../packages/feat-Chat/components/redux/directMessageSlice";
import { setCurrentConversation } from "../../packages/feat-Chat/components/redux/chatSlice";
import {
  blockUser,
  unblockUser,
  userBlockedByMe,
  userBlockedMe,
} from "../../packages/feat-Chat/components/redux/blockSlice";

const SocketMiddleware: Middleware = ({ getState, dispatch }) => {
  let socket: Socket;

  return (next) => (action) => {
    switch (action.type) {
      case ConnectSocket.type:
        try {
          let serverUrl =
            process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";
          socket = initializeSocket(serverUrl, getState().auth.token);
          dispatch(SocketConnected());
          socket.onAny((eventName, data) => {
            if (eventName.toLowerCase().includes("error")) {
              dispatch(setServerError(data.message));
              dispatch(setOpenErrorSnackbar(true));
            }
          });
          socket.on("roomCreated", (data) => {
            dispatch(addMembership(data));
          });
          socket.on("roomUpdated", (data) => {
            dispatch(updateRoomSucess(data));
          });
          socket.on("newRoom", (data) => {
            dispatch(addRoom(data));
          });
          socket.on("roomLeaved", (data) => {
            dispatch(removeMembership(data));
          });
          socket.on("userLeftRoom", (data) => {
            dispatch(removeMemberFromRoom(data));
          });
          socket.on("roomHasBeenLeft", (data) => {
            dispatch(setRoomLeaved(data));
          });
          socket.on("roomJoined", (data) => {
            dispatch(addMembership(data));
          });
          socket.on("userJoinRoom", (data) => {
            dispatch(addMemberToRoom(data));
          });
          socket.on("newRoomJoined", (data) => {
            dispatch(setRoomJoined(data));
          });
          socket.on("messageSentToRoom", (data) => {
            const { currentConversation } = getState().chat;
            if (
              currentConversation.roomId &&
              currentConversation.roomId === data.roomId
            ) {
              const conversationMessage = {
                id: data.id,
                content: data.content,
                createdAt: data.createdAt,
                chatId: data.chatId,
                sender: data.sender,
              };
              dispatch(addMessageToRoom(conversationMessage));
            }
          });
          socket.on("conversationCreated", (data) => {
            dispatch(sendMessageToUser(data));
            // dispatch(
            //   setCurrentConversation({
            //     roomId: null,
            //     directConversationId: data.id,
            //     type: 'direct',
            //   })
            // );
          });
          socket.on("messageSentToUser", (data) => {
            const { currentConversation } = getState().chat;
            if (
              currentConversation.directConversationId &&
              currentConversation.directConversationId === data.chatId
            )
              dispatch(addMessageToConversation(data));
          });
          socket.on("AdminSettedToRoom", (data) => {
            dispatch(addAdminToRoom(data));
          });
          socket.on("AdminRemovedFromRoom", (data) => {
            dispatch(RemoveAdminFromRoom(data));
          });
          socket.on("userBannedFromRoom", (data) => {
            dispatch(banMemberFromRoom(data));
          });
          socket.on("userUnBannedFromRoom", (data) => {
            dispatch(unBanMemberFromRoom(data));
          });
          socket.on("IhaveBeenBanned", (data) => {
            const { currentConversation } = getState().chat;
            if (currentConversation.roomId == data.roomId)
              dispatch(
                setCurrentConversation({
                  roomId: null,
                  directConversationId: null,
                  type: null,
                })
              );
            dispatch(removeMembership(data));
          });
          socket.on("IhaveBeenUnBanned", (data) => {
            dispatch(addMembership(data));
            const { currentConversation } = getState().chat;
            if (currentConversation.roomId == data.roomId)
              dispatch(
                setCurrentConversation({
                  roomId: data.id,
                  directConversationId: null,
                  type: "channel",
                })
              );
          });
          socket.on("userMuted", (data) => {
            dispatch(muteMemberInRoom(data));
          });
          socket.on("userKickedFromRoom", (data) => {
            dispatch(kickMemberFromRoom(data));
          });
          socket.on("IhaveBeenKicked", (data) => {
            const { currentConversation } = getState().chat;
            if (currentConversation.roomId == data.roomId) {
              dispatch(
                setCurrentConversation({
                  roomId: null,
                  directConversationId: null,
                  type: null,
                })
              );
            }
            dispatch(removeMembership(data.roomId));
          });
          socket.on("UserHaveBeenKicked", (data) => {
            dispatch(setRoomLeaved(data));
          });
          socket.on("blockedByMe", (data) => {
            dispatch(userBlockedByMe(data));
            dispatch(removeConversation(data.intraId));
            const { selectedUser } = getState().chat;
            if (selectedUser.intraId == data.intraId)
              dispatch(
                setCurrentConversation({
                  directConversationId: null,
                  roomId: null,
                  type: null,
                })
              );
          });
          socket.on("blockedMe", (data) => {
            dispatch(userBlockedMe(data));
            dispatch(removeConversation(data.intraId));
            const { selectedUser } = getState().chat;
            if (selectedUser && selectedUser.intraId == data.intraId)
              dispatch(
                setCurrentConversation({
                  directConversationId: null,
                  roomId: null,
                  type: null,
                })
              );
          });
        } catch (error) {
          console.log(error);
        }
        break;
      case disconnectSocket.type:
        socket?.disconnect();
        break;
      case createRoom.type:
        socket.emit("createRoom", action.payload);
        break;
      case updateRoom.type:
        socket.emit("updateRoom", action.payload);
        break;
      case leaveRoom.type:
        socket.emit("leaveRoom", { roomId: action.payload });
        break;
      case joinRoom.type:
        socket.emit("joinRoom", action.payload);
        break;
      case addUserToRoom.type:
        socket.emit("addUserToRoom", action.payload);
        break;
      case sendMessageToRoom.type:
        socket.emit("sendMessageToRoom", action.payload);
        break;
      case createDirectConversation.type:
        socket.emit("sendMessageToUser", action.payload);
        break;
      case setAdminRoom.type:
        socket.emit("setRoomAdmin", action.payload);
        break;
      case unSetAdminRoom.type:
        socket.emit("unSetRoomAdmin", action.payload);
        break;
      case banMember.type:
        socket.emit("banMember", action.payload);
        break;
      case unBanMember.type:
        socket.emit("unBanMember", action.payload);
        break;
      case muteMember.type:
        socket.emit("muteMember", action.payload);
        break;
      case kickMember.type:
        socket.emit("kickMember", action.payload);
        break;
      case blockUser.type:
        socket.emit("blockUser", action.payload);
        break;
      case unblockUser.type:
        socket.emit("unBlockUser", action.payload);
        break;
      default:
        break;
    }

    next(action);
  };
};

export default SocketMiddleware;
