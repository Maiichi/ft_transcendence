import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Todo, HomeThunk } from "./HomeThunk";
// import type { RootState } from "../../app/store";

// Define a type for the slice state
export interface HomeState {
  loading: boolean;
  error: string;
  items: Todo[] | null;
}

// Define the initial state using that type
const initialState: HomeState = {
  loading: false,
  error: "",
  items: null,
};

export const HomeSlice = createSlice({
  name: "todos",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // removeTodos: (state) => {
    //   console.log("ss");
    // //   state.value += 1;
    // },
  },
  extraReducers: (builder) => {
    //fetch
    builder
      .addCase(HomeThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(HomeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.items = action.payload;
      })
      .addCase(HomeThunk.rejected, (state, action) => {
        state.loading = false;
        state.items = [];
        state.error = action.error.message || "";
      });
  },
});

// export const { removeTodos } = HomeSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default HomeSlice.reducer;
