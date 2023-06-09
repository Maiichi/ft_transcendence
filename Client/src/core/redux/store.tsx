import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../../packages/feat-Test/components/CounterSlice";
import todosSlice from "../../packages/feat-Test/components/TodosSlice";
// ...

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    todos: todosSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
