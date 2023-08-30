import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../../../core/utils/apiRequest";

type membershipsPayload = {
    memberships: [];
}

export const getChatRooms = createAsyncThunk(
    "chat/rooms",
    async () => {
        try {
            // const dispatch = useAppDispatch();
            // const token = useAppSelector((state) => state.auth.token);
            const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwNjM1LCJlbWFpbCI6Iml6YWlsQHN0dWRlbnQuMTMzNy5tYSIsImlhdCI6MTY5MzM0MDEzNywiZXhwIjoxNjkzNDI2NTM3fQ.KRZDcysAOZD4Xc7qd8Hd1pBwKFcVhJI6a4aS_X5a-V4';
            const response = await apiRequest(`/chat/rooms`, {
                method: "GET",
                headers : {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log("REPONSE ==" + JSON.stringify(response.data));
            // payload.room = response?.message || {};
            // dispatch(setConversation(response.data));
            // return response?.data;
            // const rooms = response?.data.map((item: any) => item.room); // Extract "room" property
            // console.log("rooms ,", rooms);
            console.log("RESP rooms ===" + JSON.stringify(response));
            return response.data;
        } catch (error) {
            console.log("error in chatThunk", error);
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