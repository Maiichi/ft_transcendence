import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../../app/store";

// Define a type for the slice state
export interface CoreState {
  displayNavbar: boolean;
}

// Define the initial state using that type
const initialState: CoreState = {
  displayNavbar: true,
};

export const coreSlice = createSlice({
  name: "core",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDisplayNavbar: (state, action: PayloadAction<boolean>) => {
      state.displayNavbar = !state.displayNavbar;
    },
  },
});

export const { setDisplayNavbar } = coreSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default coreSlice.reducer;
