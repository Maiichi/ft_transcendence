import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../../../core/utils/apiRequest";
import { Socket } from "socket.io-client";
import { setError, setRoomSlice } from "./chatSlice";
import { RootState } from "../../../../core";

type RoomPayload = {
  name: string;
  type: string;
  description: string;
  password: string;
  ownerId: string;
};

// export const getChatRooms = createAsyncThunk(
//     "chat/rooms",
//     async (token: string) => {
//         try {
//             const response = await apiRequest(`/chat/rooms`, {
//                 method: "GET",
//                 headers : {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             return response.data;
//         } catch (error) {
//             console.log("error in chatThunk", error);
//             throw error;
//         }
//     }
// );

export const getMemberships = createAsyncThunk(
  "chat/memberships",
  async (token: string) => {
    try {
      const response = await apiRequest(`/chat/memberships`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //   console.log("getMemberships ==", response.data);
      return response.data;
    } catch (error) {
      console.log("error in chatThunk", error);
      throw error;
    }
  }
);

export const getChatRoomMessages = createAsyncThunk(
  "chat/room/messages",
  async ({ token, roomId }: { token: string; roomId: number }) => {
    try {
      const resp = await apiRequest(`/chat/room/${roomId}/conversation`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("room Data thunk ", resp.data);
      return resp.data.messages;
    } catch (error) {
      console.log("error in getChatRoomMessages", error);
      throw error;
    }
  }
);

export const createRoom = createAsyncThunk(
  "chat/room/create",

  async (room: RoomPayload, { getState, dispatch }) => {
    try {
      const roomData = {
        name: room.name,
        ownerId: room.ownerId,
        description: room.description,
        type: room.type,
        password: room.password,
      };
      let state: RootState = getState();
      let socketState = state.socket;
      if (socketState.socket) {
        let socket: Socket = socketState.socket;
        socket.emit("createRoom", roomData);
        socket.on("createRoomResponse", (data) => {
          console.log("createRoomResponse", data);
          //   dispatch(addMembership(data));
        });
        // console.log(res);
      } else {
        dispatch(setError("createRoom action required socket connection "));
      }
    } catch (error) {
      // Handle error if needed
      console.log("error in createRoom Thunk ", error);
      throw error;
    }
  }
);

/***Second Parameter of the Async Function (_ and thunkAPI):

In an async function defined for a thunk, there are typically two parameters:

The first parameter represents the payload that was dispatched when the thunk action was called. Since your getChatRooms thunk doesn't require any payload, the convention in JavaScript is to use an underscore (_) to indicate an unused parameter. You can also use a meaningful name here if you prefer, but in this case, it's not necessary.
The second parameter is an object that provides access to various functions and information related to the thunk's execution context. In Redux Toolkit, this parameter is often named thunkAPI.
The thunkAPI object includes several properties, such as:

dispatch: The dispatch function to dispatch actions.
getState: A function to access the current state of the Redux store.
extra: Additional data that can be passed to the thunk when it's created.
By using thunkAPI, you can access the getState function to retrieve data from the Redux store, which is what you're doing to get the authentication token.

Retrieving Token from Redux Store (thunkAPI.getState().auth.token):

Your getChatRooms thunk needs the authentication token to make an authorized API request. Instead of using useAppSelector, which is a hook intended for use within functional components, you're using thunkAPI.getState().auth.token to access the token.

The getState function retrieves the current state of the Redux store. Since you're using Redux Toolkit, I assume you have a reducer for authentication that stores the token in the state under the auth property. Therefore, thunkAPI.getState().auth.token accesses the authentication token from the Redux store.

If your state structure is different, adjust the path accordingly to correctly access the token from the state.

By retrieving the token this way, you ensure that your thunk has access to the token without relying on hooks that are meant for component rendering. */
