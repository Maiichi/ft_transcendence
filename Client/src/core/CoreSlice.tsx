import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AlertColor } from "@mui/material";
// import type { RootState } from "../../app/store";

// Define a type for the slice state
export interface CoreState {
  displayNavbar: boolean;
  displayUserActions: boolean;
  displayGameInvitation: boolean;
  openSnackbar: boolean;
  serverMessage: string | null;
  severity: AlertColor;
}

// Define the initial state using that type
const initialState: CoreState = {
  displayNavbar: true,
  displayUserActions: false,
  displayGameInvitation: false,
  serverMessage: null,
  openSnackbar: false,
  severity: "success",
};

export const coreSlice = createSlice({
  name: "core",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDisplayNavbar: (state, action: PayloadAction<boolean>) => {
      state.displayNavbar = !state.displayNavbar;
    },
    setDisplayUserActions: (state, action: PayloadAction<boolean>) => {
      state.displayUserActions = action.payload;
    },
    setServerMessage: (state, action: PayloadAction<string>) => {
      state.serverMessage = action.payload;
    },
    setSeverity: (state, action: PayloadAction<AlertColor>) => {
      state.severity = action.payload;
    },
    setOpenSnackbar: (state, action: PayloadAction<boolean>) => {
      state.openSnackbar = action.payload;
    },
    setDisplayGameInvitation: (state, action: PayloadAction<boolean>) => {
      state.displayGameInvitation = action.payload;
    }
  },
});

export const {
  setDisplayUserActions,
  setOpenSnackbar,
  setServerMessage,
  setDisplayNavbar,
  setDisplayGameInvitation,
  setSeverity,
} = coreSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default coreSlice.reducer;
