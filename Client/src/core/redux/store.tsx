import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Choose the storage solution you want to use
import { combineReducers } from "redux";
import authSlice from "../../packages/feat-Auth/components/authSlice";
import authTransform from "../../packages/feat-Auth/authTransform";
import coreSlice from "../CoreSlice";
import SocketMiddleware from "../socket/socketMiddleware";
import socketSlice from "../socket/socketSlice";
import roomSlice from "../../packages/feat-Chat/components/redux/roomSlice";
import DirectMessageSlice from "../../packages/feat-Chat/components/redux/directMessageSlice";
import searchSlice from "../../packages/feat-Search/redux/searchSlice";
import chatSlice from "../../packages/feat-Chat/components/redux/chatSlice";
import friendSlice from "../../packages/feat-Account/components/redux/friendSlice";
import ProfileSlice from "../../packages/feat-Account/components/redux/ProfileSlice";
// import blockSlice from "../../packages/feat-Chat/components/blockSlice";
// import GameSlice from "../../packages/feat-Game/redux/GameSlice";
import blockSlice from "../../packages/feat-Account/components/redux/blockSlice";
import gameSlice2 from "../../packages/feat-Game/redux/GameSlice";

// ...

const rootReducer = combineReducers({
  auth: authSlice,
  core: coreSlice,
  channels: roomSlice,
  directMessage: DirectMessageSlice,
  socket: socketSlice,
  search: searchSlice,
  chat: chatSlice,
  // gameState: GameSlice,
  game: gameSlice2,
  friends: friendSlice,
  profile: ProfileSlice,
  block: blockSlice,
});

const persistConfig = {
  key: "root", // Key to access your storage
  storage,
  whitelist: ["auth"],
  transforms: [authTransform], // Use the custom transform
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat([SocketMiddleware]),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {counter: CounterState, todos: TodosState, auth: AuthState}
export type AppDispatch = typeof store.dispatch;
