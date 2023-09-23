// import { createSlice } from "@reduxjs/toolkit";
// import { Todo, fetchTodos } from "./TodosThunk";
// // import type { RootState } from "../../app/store";

// // Define a type for the slice state
// export interface TodosState {
//   loading: boolean;
//   error:  string;
//   items: Todo[] | null;
// }

// // Define the initial state using that type
// const initialState: TodosState = {
//   loading: false,
//   error: "",
//   items: null
// };

// export const todosSlice = createSlice({
//   name: "todos",
//   // `createSlice` will infer the state type from the `initialState` argument
//   initialState,
//   reducers: {
//     removeTodos: (state) => {
//       console.log("ss");
//     //   state.value += 1;
//     },
//   },
//   extraReducers: (builder) => {
//     //fetch
//     builder
//       .addCase(fetchTodos.pending, (state)=>{
//         state.loading = true;
//       })
//       .addCase(fetchTodos.fulfilled, (state,action)=>{
//         state.loading = false;
//         state.error = '';
//         state.items = action.payload;
//       })
//       .addCase(fetchTodos.rejected, (state,action)=>{
//         state.loading = false;
//         state.items = [];
//         state.error = action.error.message || '';
//       })
//     }
// });

// export const { removeTodos} = todosSlice.actions;

// // // Other code such as selectors can use the imported `RootState` type
// // export const selectCount = (state: RootState) => state.counter.value;

// export default todosSlice.reducer;

const todosSlice = ''

export default todosSlice