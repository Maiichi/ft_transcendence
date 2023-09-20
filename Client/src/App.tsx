import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { routes, store, useAppDispatch, useAppSelector } from "./core";
import RequireAuth from "./core/RequireAuth";
import React, { ReactNode, useEffect, useState } from "react";
import { useAuthentication } from "./packages/feat-Auth/authUtils";
import { ConnectSocket, disconnectSocket } from "./packages";

interface RequireAuthProps {
  children: ReactNode;
}

const SocketInit = (props: any) => {
  const socket = useAppSelector((state) => state.socket);
  const isAuthenticated = useAuthentication();
  const dispatch = useAppDispatch();

  if (isAuthenticated && !socket.isConnected) {
    console.log("connectSocket");
    dispatch(ConnectSocket());
  }

  return props.children;
};


function App() {
  console.log("app Rendering");
  return (
    <Provider store={store}>
      <SocketInit>
        <BrowserRouter>
          <Routes>
            {routes.map((item) => (
              <Route
                path={item.path}
                element={
                  item?.requireAuth ? (
                    <RequireAuth>{item.element}</RequireAuth>
                  ) : (
                    item.element
                  )
                }
              />
            ))}
          </Routes>
        </BrowserRouter>
      </SocketInit>
    </Provider>
  );
}

export default App;
