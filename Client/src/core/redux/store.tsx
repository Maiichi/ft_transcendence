import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Choose the storage solution you want to use
import { combineReducers } from "redux";
import counterSlice from "../../packages/feat-Test/components/CounterSlice";
import todosSlice from "../../packages/feat-Test/components/TodosSlice";
import authSlice from "../../packages/feat-Auth/components/authSlice";
import decryptionTransform from "../../packages/feat-Auth/decryptionTransform";
import coreSlice from "../CoreSlice";
import FilterSlice from "../utils/components/Input/SearchSlice";
import SocketMiddleware from "../socket/socketMiddleware";
import socketSlice from "../socket/socketSlice";
import roomSlice from "../../packages/feat-Chat/channels/redux/roomSlice";
import DirectMessageSlice from "../../packages/feat-Chat/directMessages/redux/directMessageSlice";
import ProfileSlice from "../../packages/feat-Account/components/ProfileSlice";
// ...

const rootReducer = combineReducers({
  counter: counterSlice,
  todos: todosSlice,
  auth: authSlice,
  core: coreSlice,
  channels: roomSlice,
  directMessage: DirectMessageSlice,
  filter: FilterSlice,
  socket: socketSlice,
  profile: ProfileSlice,
});

const persistConfig = {
  key: "root", // Key to access your storage
  storage,
  whitelist: ["auth"],
  transforms: [decryptionTransform], // Use the custom transform
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([SocketMiddleware]),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {counter: CounterState, todos: TodosState, auth: AuthState}
export type AppDispatch = typeof store.dispatch;
