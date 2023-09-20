import { createSlice } from "@reduxjs/toolkit";

export interface SocketState {
    isEstablishingConnection: boolean;
    isConnected: boolean;
    error: any;
}

const initialState: SocketState = {
    isEstablishingConnection: false,
    isConnected: false,
    error: null,
};

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        ConnectSocket: (state) => {
            state.isEstablishingConnection = true;
        },
        SocketConnected: (state) => {
            state.isConnected = true;
        },
        disconnectSocket: (state) => {
            state.isConnected = false;
            state.isEstablishingConnection = false;
        },
    },
});

export const { ConnectSocket, SocketConnected, disconnectSocket } =
    socketSlice.actions;

export default socketSlice.reducer;
