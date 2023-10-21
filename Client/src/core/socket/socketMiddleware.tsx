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
} from "../../packages/feat-Chat/channels/redux/roomSlice";
import { setIsConversation } from "../CoreSlice";
import {
  addRoom,
  joinRoom,
  setRoomJoined,
  setRoomLeaved,
} from "../../packages/feat-Search/redux/searchSlice";

const SocketMiddleware: Middleware = ({ getState, dispatch }) => {
  let socket: Socket;
  return (next) => (action) => {
    switch (action.type) {
      case ConnectSocket.type:
        console.log("Connect Socket Middleware");
        let serverUrl =
          process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";
        socket = initializeSocket(serverUrl, getState().auth.token);
        dispatch(SocketConnected());
        socket.on("roomCreated", (data) => {
          dispatch(addMembership(data));
        });
        socket.on("newRoom", (data) => {
          dispatch(addRoom(data));
        });
        socket.on("roomCreationError", (data) => {
          dispatch(createRoomError(data.message));
        });

        socket.on("roomLeaved", (data) => {
          dispatch(removeMembership(data));
          dispatch(setIsConversation(false));
        });
        socket.on("userLeftRoom", (data) => {
          console.log("data (userLeftRoom)===", data);
          dispatch(removeMemberFromRoom(data));
        });
        socket.on("roomHasBeenLeft", (data) => {
          dispatch(setRoomLeaved(data));
        });
        socket.on("roomJoined", (data) => {
          console.log("data ins roomJOined ==", data);
          dispatch(addMembership(data));
        });
        socket.on("userJoinRoom", (data) => {
          dispatch(addMemberToRoom(data));
        });
        socket.on("newRoomJoined", (data) => {
          dispatch(setRoomJoined(data));
        });
        break;
      case disconnectSocket.type:
        socket?.disconnect();
        break;
      case createRoom.type:
        socket.emit("createRoom", action.payload);
        break;
      case leaveRoom.type:
        socket.emit("leaveRoom", { roomId: action.payload });
        break;
      case joinRoom.type:
        socket.emit("joinRoom", action.payload);
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
