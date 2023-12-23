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

import {setDisplayGameInvitation, setOpenSnackbar, setServerMessage, setSeverity } from "../CoreSlice";
import {
  addRoom,
  joinRoom,
  setRoomJoined,
  setRoomLeaved,
} from "../../packages/feat-Search/redux/searchSlice";
import { useAppSelector } from "../redux";
import { acceptUserGameInvite, declineUserGameInvite, inviteUserToGame, opponentAcceptInvite, opponentDeclineInvite, receiveGameInvitation, setInviteAccepted, setInviteDeclined, setInviterId } from "../../packages/feat-Game/redux/GameSlice";
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
import { AlertColor } from "@mui/material";
import { setToken, userLogout } from "../../packages/feat-Auth/components/authSlice";

const SocketMiddleware: Middleware = ({ getState, dispatch }) => {
  let socket: Socket;
  const OpenSnackbar = (message: string, severity: AlertColor) => {
    dispatch(setServerMessage(message));
    dispatch(setOpenSnackbar(true));
    dispatch(setSeverity(severity));
  };

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
              OpenSnackbar(data.message, "error");
            }
          });
          socket.on("roomCreated", (data) => {
            OpenSnackbar(data.successMsg, "success");
            dispatch(addMembership(data.data));
          });
          socket.on("roomUpdated", (data) => {
            OpenSnackbar(data.successMsg, "success");
            dispatch(updateRoomSucess(data.data));
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
          socket.on('messageSentToRoom', (data) => {
            const {currentConversation} = getState().chat;
            console.log("Current Conversation ==", currentConversation);
            if (currentConversation)
            {
              if (currentConversation.roomId === data.roomId)
              {
                const conversationMessage = {
                  id: data.id,
                  content: data.content,
                  createdAt: data.createdAt,
                  chatId: data.chatId,
                  sender: data.sender,
                } 
                dispatch(addMessageToRoom(conversationMessage));
              }
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
          socket.on('messageSentToUser', (data) => {
            console.log('data coming from (messageSentToUser) =', JSON.stringify(data));
            const {currentConversation} = getState().chat;
            if (currentConversation)
            {
              if (currentConversation.directConversationId === data.chatId)
                dispatch(addMessageToConversation(data));
            }
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
          socket.on('IhaveBeenBanned', (data) => {
            const {currentConversation} = getState().chat;
            if (currentConversation && currentConversation.roomId == data.roomId)
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
            // const {currentConversation} = getState().chat;
            // if (currentConversation.roomId == data.roomId)
            //   dispatch(
            //     setCurrentConversation({
            //       roomId: data.id,
            //       directConversationId: null,
            //       type: "channel",
            //     })
            //   );
          });
          socket.on("userMuted", (data) => {
            dispatch(muteMemberInRoom(data));
          });
          socket.on("userKickedFromRoom", (data) => {
            dispatch(kickMemberFromRoom(data));
          });
          socket.on('IhaveBeenKicked', (data) => {
            const {currentConversation} = getState().chat;
            if (currentConversation){
              if (currentConversation.roomId == data.roomId)
              {
                dispatch(
                  setCurrentConversation({
                    roomId: null,
                    directConversationId: null,
                    type: null,
                  })
                );
              }
            }
            dispatch(removeMembership(data.roomId));
          });
          socket.on("UserHaveBeenKicked", (data) => {
            dispatch(setRoomLeaved(data));
          });
          socket.on('blockedByMe', (data) => {
            console.log('data coming from (blockedByMe) =', data);
            const {selectedUser} = getState().chat;
            dispatch(userBlockedByMe(data));
            dispatch(removeConversation(data.intraId));
            if (selectedUser)
            {
              if (selectedUser.intraId == data.intraId)
                dispatch(setCurrentConversation({
                  directConversationId: null,
                  roomId: null,
                  type: null
                }));
            }
          });
          socket.on('blockedMe', (data) => {
            const {selectedUser} = getState().chat;
            dispatch(userBlockedMe(data));
            dispatch(removeConversation(data.intraId));
            console.log('selectedUser ==', selectedUser);
            if (selectedUser)
            {
              if (selectedUser.intraId == data.intraId)
                dispatch(setCurrentConversation({
                  directConversationId: null,
                  roomId: null,
                  type: null
                }));
            }
          });
          socket.on('gameInvitationReceived' , (data) => {
            console.log('gameInvitationReceived');
            console.log ('data (gameInvitationReceived) == ', data);
            dispatch(setInviterId(data.inviterId));
            dispatch(setDisplayGameInvitation(true));
            dispatch(receiveGameInvitation(true));
          });
          socket.on('gameInvitationAccepted', () => {
            console.log('listen for the event (gameInvitationAccepted) should be display in all accepterSocket')
            dispatch(setDisplayGameInvitation(false));
            dispatch(setInviteAccepted(true));
          });
          socket.on('opponentAcceptGameInvite', (data) => {
            console.log ('data (opponentAcceptGameInvite) == ', data);
            console.log('listen for the event (gameInvitationAccepted) should be display in all accepterSocket')
            dispatch(opponentAcceptInvite(true));
          });
          socket.on('opponentDeclineGameInvite', (data) => {
            dispatch(setServerMessage(`User ${data.inviterId} decline your game Invite`));
              dispatch(setOpenSnackbar(true));
            dispatch(opponentDeclineInvite(true));
          });
          socket.on('gameInvitationDeclined', () => {
            console.log('listen for the event (gameInvitationDeclined) should be display in all declinerSocket')
            dispatch(setDisplayGameInvitation(false));
            dispatch(setInviteDeclined(true));
          });
          socket.on('userLoggedOut' , () => {
            console.log("logout");
            dispatch(setToken(null));
            dispatch(disconnectSocket());
            // navigate('/login');
          })
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
      case inviteUserToGame.type:
        socket.emit('inviteToGame', action.payload);
        break;
      case acceptUserGameInvite.type:
        socket.emit('acceptGameInvite', action.payload);
        break;
      case declineUserGameInvite.type:
        socket.emit('declineGameInvite', action.payload);
        break;
      case userLogout.type:
        socket.emit('logout');
        break;
      default:
        break;
    }

    next(action);
  };
};

export default SocketMiddleware;
