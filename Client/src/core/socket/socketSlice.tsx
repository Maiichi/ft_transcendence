import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

export interface SocketState {
  isEstablishingConnection: boolean;
  isConnected: boolean;
  socket: any;
}

const initialState: SocketState = {
  isEstablishingConnection: false,
  isConnected: false,
  socket: null,
};

const SocketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    startConnecting: (state) => {
      state.isEstablishingConnection = true;
    },
    disconnectSocket: (state) => {
      state.isConnected = false;
      state.isEstablishingConnection = false;
      state.socket = null;
    },
    connectionEstablished: (state, action: PayloadAction<Socket>) => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
      state.socket = action.payload;
    },
  },
});

export const { disconnectSocket, startConnecting, connectionEstablished } =
  SocketSlice.actions;

export default SocketSlice.reducer;
