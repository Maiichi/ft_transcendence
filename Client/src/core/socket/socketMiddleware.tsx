import { Api } from "@mui/icons-material";
import {
    configureStore,
    createListenerMiddleware,
    Middleware,
} from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import {
    ConnectSocket,
    disconnectSocket,
    SocketConnected,
} from "./socketSlice";
import { initializeSocket } from "./socketManager";
import { getMemberships } from "../../packages/feat-Chat/components/rooms/chatThunk";
import {
    addMembership,
    createRoom,
} from "../../packages/feat-Chat/components/rooms/chatSlice";

export const listenerMiddleware = createListenerMiddleware();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
// listenerMiddleware.startListening({
//   actionCreator: startConnecting,
//   effect: async (action, listenerApi) => {
//     // Run whatever additional side-effect-y logic you want here
//     console.log("startConnecting Middleware");

//     // Can cancel other running instances
//     listenerApi.cancelActiveListeners();

//     // Run async logic

//     // Pause until action dispatched or state changed
//     // if (await listenerApi.condition(matchSomeAction)) {
//     //   // Use the listener API methods to dispatch, get state,
//     //   // unsubscribe the listener, start child tasks, and more
//     //   listenerApi.dispatch(todoAdded('Buy pet food'))

//     //   // Spawn "child tasks" that can do more work and return results
//     //   const task = listenerApi.fork(async (forkApi) => {
//     //     // Can pause execution
//     //     await forkApi.delay(5)
//     //     // Complete the child by returning a value
//     //     return 42
//     //   })

//     //   const result = await task.result
//     //   // Unwrap the child result in the listener
//     //   if (result.status === 'ok') {
//     //     // Logs the `42` result value that was returned
//     //     console.log('Child succeeded: ', result.value)
//     //   }
//     // }
//   },
// });

const SocketMiddleware: Middleware = ({ getState, dispatch }) => {
    let socket: Socket;
    return (next) => (action) => {
        switch (action.type) {
            case ConnectSocket.type:
                console.log("dkhel ", action.type);
                let serverUrl =
                    process.env.REACT_APP_BACKEND_URL ||
                    "http://localhost:5001";
                socket = initializeSocket(serverUrl, getState().auth.token);
                dispatch(SocketConnected());
                break;
            case disconnectSocket.type:
                socket?.disconnect();
                break;
            case createRoom.type:
                socket.emit("createRoom", action.payload);
                socket.on("roomCreated", (data) => {
                    // console.log("data in roomCreated", data);
                    // Handle the event data and update your component's state as needed
                    dispatch(addMembership(data));
                });
                break;
            default:
                break;
        }
        // if (ConnectSocket.match(action)) {

        //     console.log("dkhel ",action.type);
        //     let serverUrl =
        //         process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";
        //     socket = initializeSocket(serverUrl, getState().auth.token);
        //     dispatch(SocketConnected());
        // } else if (disconnectSocket.match(action)) {
        //     socket?.disconnect();
        // }
        next(action);
    };
};

export default SocketMiddleware;
