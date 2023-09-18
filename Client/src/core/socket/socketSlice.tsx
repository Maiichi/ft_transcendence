import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { StartSocketConnection } from "./socketThunk";

export interface SocketState {
  isEstablishingConnection: boolean;
  isConnected: boolean;
  socket: any;
  error: any;
}

const initialState: SocketState = {
  isEstablishingConnection: false,
  isConnected: false,
  socket: null,
  error: null,
};

const SocketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    disconnectSocket: (state) => {
      state.isConnected = false;
      state.isEstablishingConnection = false;
      state.socket = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(StartSocketConnection.pending, (state) => {
        state.isEstablishingConnection = true;
      })
      .addCase(StartSocketConnection.fulfilled, (state, action) => {
        state.isConnected = true;
        state.isEstablishingConnection = true;
        state.socket = action.payload;
      })
      .addCase(StartSocketConnection.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { disconnectSocket } = SocketSlice.actions;

export default SocketSlice.reducer;
