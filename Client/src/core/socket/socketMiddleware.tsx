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
  createRoomError,
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
} from "../../packages/feat-Chat/channels/redux/roomSlice";
import { setDisplayGameInvitation, setOpenErrorSnackbar, setServerError } from "../CoreSlice";
import {
  addRoom,
  joinRoom,
  setRoomJoined,
  setRoomLeaved,
} from "../../packages/feat-Search/redux/searchSlice";
import { addMessageToConversation, createDirectConversation, removeConversation, sendMessageToUser } from "../../packages/feat-Chat/directMessages/redux/directMessageSlice";
import { setCurrentConversation } from "../../packages/feat-Chat/components/chatSlice";
import { MuteUserInRoom } from "../../packages/feat-Chat/channels/modals/MuteUserInRoom";
import { I_ConversationMessages } from "../../packages/feat-Chat/components/types";
import { blockUser, userBlockedByMe, userBlockedMe } from "../../packages/feat-Chat/components/blockSlice";
import { useAppSelector } from "../redux";
import { acceptUserGameInvite, inviteUserToGame, receiveGameInvitation, setInviteAccepted, setInviteDeclined } from "../../packages/feat-Game/redux/GameSlice";

const SocketMiddleware: Middleware = ({ getState, dispatch }) => {
  let socket: Socket;
  
  return (next) => (action) => {
    switch (action.type) {
      case ConnectSocket.type:
        try {
          let serverUrl =
            `${process.env.REACT_APP_BACKEND_URL}`;
            console.log('serverURL == ', serverUrl);
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
            console.log("data (userLeftRoom)===", data);
            dispatch(removeMemberFromRoom(data));
          });
          socket.on("roomHasBeenLeft", (data) => {
            dispatch(setRoomLeaved(data));
          });
          socket.on("roomJoined", (data) => {
            console.log("data in roomJOined ==", data);
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
          socket.on('conversationCreated', (data) => {
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
          socket.on('AdminSettedToRoom', (data) => {
            console.log('data coming from (AdminSettedToRoom) =', data);
            dispatch(addAdminToRoom(data));
          });
          socket.on('AdminRemovedFromRoom', (data) => {
            console.log('data coming from (AdminRemovedFromRoom) =', data);
            dispatch(RemoveAdminFromRoom(data));
          });
          socket.on('userBannedFromRoom', (data) => {
            console.log('data coming from (userBannedFromRoom) =', data);
            dispatch(banMemberFromRoom(data));
          });
          socket.on('userUnBannedFromRoom', (data) => {
            console.log('data coming from (userUnBannedFromRoom) =', data);
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
          socket.on('IhaveBeenUnBanned', (data) => {
            console.log('i have been unbanned');
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
          socket.on('userMuted', (data) => {
            console.log('data coming from (userMuted) =', data);
            dispatch(muteMemberInRoom(data))
          });
          socket.on('userKickedFromRoom', (data) => {
            console.log('data coming from (userKickedFromRoom) =', data);
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
          socket.on('UserHaveBeenKicked', (data) => {
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
            dispatch(setDisplayGameInvitation(true));
            dispatch(receiveGameInvitation(true));
          });
          socket.on('gameInvitationAccepted', () => {
            console.log('listen for the event (gameInvitationAccepted) should be display in all accepterSocket')
            dispatch(setDisplayGameInvitation(false));
            dispatch(setInviteAccepted(true));
          });
          socket.on('gameInvitationDeclined', () => {
            dispatch(setDisplayGameInvitation(false));
            dispatch(setInviteDeclined(true));
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
        socket.emit('sendMessageToRoom', action.payload);
        break;
      case createDirectConversation.type:
        socket.emit('sendMessageToUser', action.payload);
        break;
      case setAdminRoom.type:
        socket.emit('setRoomAdmin', action.payload);
        break;
      case unSetAdminRoom.type:
        socket.emit('unSetRoomAdmin', action.payload);
        break;
      case banMember.type:
        socket.emit('banMember', action.payload);
        console.log('action payload ==', action.payload);
        break;
      case unBanMember.type:
        socket.emit('unBanMember', action.payload);
        break;
      case muteMember.type:
        socket.emit('muteMember', action.payload);
        break;
      case kickMember.type:
        socket.emit('kickMember', action.payload);
        break;
      case blockUser.type:
        socket.emit('blockUser', action.payload);
        break;
      case inviteUserToGame.type:
        socket.emit('inviteToGame', action.payload);
        break;
      case acceptUserGameInvite.type:
        socket.emit('acceptGameInvite', action.payload);
        console.log('(acceptGameInvite) Payload ==', action.payload);
        break;
      default:
        break;
    }

    next(action);
  };
};

export default SocketMiddleware;

// export const listenerMiddleware = createListenerMiddleware();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
// listenerMiddleware.startListening({
//   actionCreator: ConnectSocket,
//   effect: async (action, listenerApi) => {
//     // Run whatever additional side-effect-y logic you want here
//     console.log("startConnecting Middleware");

//     // Can cancel other running instances
//     listenerApi.cancelActiveListeners();

//     // Run async logic

//     // Pause until action dispatched or state changed
//     if (await listenerApi.condition(matchSomeAction)) {
//       // Use the listener API methods to dispatch, get state,
//       // unsubscribe the listener, start child tasks, and more
//       listenerApi.dispatch(todoAdded('Buy pet food'))

//       // Spawn "child tasks" that can do more work and return results
//       const task = listenerApi.fork(async (forkApi) => {
//         // Can pause execution
//         await forkApi.delay(5)
//         // Complete the child by returning a value
//         return 42
//       })

//       const result = await task.result
//       // Unwrap the child result in the listener
//       if (result.status === 'ok') {
//         // Logs the `42` result value that was returned
//         console.log('Child succeeded: ', result.value)
//       }
//     }
//   },
// });
