// socketSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  socket: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    initializeSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const { initializeSocket } = socketSlice.actions;
export default socketSlice.reducer;