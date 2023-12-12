import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../../app/store";

// Define a type for the slice state
export interface CoreState {
  displayNavbar: boolean;
  displayUserActions: boolean;
  openErrorSnackbar: boolean;
  displayGameInvitation: boolean;
  serverError: string | null;
}

// Define the initial state using that type
const initialState: CoreState = {
  displayNavbar: true,
  displayUserActions: false,
  serverError: null,
  displayGameInvitation: false,
  openErrorSnackbar: false,
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
    setServerError: (state, action: PayloadAction<string>) => {
      state.serverError = action.payload;
    },
    setOpenErrorSnackbar: (state, action: PayloadAction<boolean>) => {
      state.openErrorSnackbar = action.payload;
    },
    setDisplayGameInvitation: (state, action: PayloadAction<boolean>) => {
      state.displayGameInvitation = action.payload;
    }
  },
});

export const {
  setDisplayUserActions,
  setOpenErrorSnackbar,
  setServerError,
  setDisplayNavbar,
  setDisplayGameInvitation,
} = coreSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default coreSlice.reducer;
