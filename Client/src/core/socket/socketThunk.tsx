import { createAsyncThunk } from "@reduxjs/toolkit";

import { Socket } from "socket.io-client";
import { RootState } from "../redux";
import { initializeSocket } from "./socketManager";

export const StartSocketConnection = createAsyncThunk<
  Socket | undefined,
  string
>("socket/connexion", async (token, { getState }) => {
  try {
    const state: RootState = getState();
    // console.log(state.socket.isConnected);
    if (!state.socket.isConnected) {
      let serverUrl =
        process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";
      let socket = initializeSocket(serverUrl, token);
      //   console.log(token);
      return socket;
    }
  } catch (error) {
    console.error("Socket connexion failed:", error);
    throw error; // Propagate the error to be handled by .rejected case
  }
});
