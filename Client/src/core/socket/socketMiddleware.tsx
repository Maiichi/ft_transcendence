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
// import { acceptUserGameInvite, declineUserGameInvite, inviteUserToGame, opponentAcceptInvite, receiveGameInvitation, setInviteAccepted, setInviteDeclined, setInviterId } from "../../packages/feat-Game/redux/GameSlice";
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
} from "../../packages/feat-Account/components/redux/blockSlice";
import { AlertColor } from "@mui/material";
import { setToken, userLogout } from "../../packages/feat-Auth/components/authSlice";
import { acceptGameInvitation, declineGameInvitation, inviteToGame, resetGame, resetGameState, setCurrentTab, setGameMode, setInviteAccepted, setInvited, setInviter, setInviteReceived, setInviteSent } from "../../packages/feat-Game/redux/GameSlice";

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
          socket.on('roomHasBeenUpdated', (data) => {
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
          socket.on('gameInvitationReceived', (data) => {
              console.log("data (gameInvitationReceived) = ", data);
              dispatch(setInviter(data.inviter));
              dispatch(setInviteReceived(true));
              dispatch(setDisplayGameInvitation(true));
              dispatch(setGameMode(data.gameMode));
          }); 
          // this event for all the tabs to inform them that a an invite is declined
          socket.on('gameInvitationDeclined', () => {
            console.log(" (gameInvitationDeclined) ");
            dispatch(setDisplayGameInvitation(false));
            // dispatch(setInviteReceived(false));
            dispatch(resetGameState());
            // const {inviter} = getState().game;
            // if (inviter)
            //   dispatch(setInviter(null)); // test
            // console.log("inviter === ", inviter);
          });
          // this event will appears on the sender of the game invitation
          socket.on('opponentDeclineGameInvite', (data) => {
            console.log("data (opponentDeclineGameInvite) = ", data);
            const {invited} = getState().game;
            if (invited)
            {
              if (invited.intraId === data.data)
                OpenSnackbar(data.successMsg, "error");
                dispatch(setInviteSent(false));
                dispatch(setInvited(null));
                dispatch(setCurrentTab(false));
            }
            // dispatch(resetGame());
          });
          // this event for the user who 
          socket.on('gameInvitationAccepted', (data) => {
            console.log("------- gameInvitationAccepted   --------  ");
            // dispatch(setInviteReceived(false));
            dispatch(setDisplayGameInvitation(false));
            const {currentTab} = getState().game;
            console.log("currentTab == ", currentTab);
            console.log("data === ", data.data);
            if (currentTab !== data.data)
            {
              dispatch(setInviteReceived(false));
              // setTimeout(() => {
              //   dispatch(setInviter(null));
              // }, 1000);
            }
          });
          socket.on('opponentAcceptGameInvite', (data) => {
            const {invited} = getState().game;
            if (invited)
            {
              if (invited.intraId === data.data.intraId)
              {
                console.log("opponentAcceptGameInvite if condition");
                dispatch(setInviteSent(false));
                dispatch(setInviteAccepted(true));
              }
            }
          })
          // socket.on('gameInvitationReceived' , (data) => {
          //   dispatch(setInviterId(data.inviterId));
          //   dispatch(setDisplayGameInvitation(true));
          //   dispatch(receiveGameInvitation(true));
          // });
          // // this event for all the tabs of the user who accept the game invite
          // socket.on('gameInvitationAccepted', () => {
          //   dispatch(setDisplayGameInvitation(false));
          // });
          // // this event is for all the tabs of the user who's invite is accepted (sender)
          // socket.on('opponentAcceptGameInvite', (data) => {
          //   dispatch(opponentAcceptInvite(true));
          // });
          //  // this event is for all the tabs of the user who's invite is declined (sender)
          // socket.on('opponentDeclineGameInvite', (data) => {
          //   OpenSnackbar(data.successMsg, "error");
          //   dispatch(opponentDeclineInvite(true));
          //   dispatch(resetGame());
          // });
          // // this event is for all the tabs of the user who decline the invite receieved (receiver)
          // socket.on('gameInvitationDeclined', () => {
          //   dispatch(setDisplayGameInvitation(false));
          //   dispatch(receiveGameInvitation(false));
          //   dispatch(setInviteDeclined(true));
          // });
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
      case inviteToGame.type:
        socket.emit('inviteToGame', action.payload);
        break;
      case declineGameInvitation.type:
        socket.emit('declineGameInvite', action.payload);
        break;
      case acceptGameInvitation.type:
        socket.emit('acceptGameInvite', action.payload);
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
