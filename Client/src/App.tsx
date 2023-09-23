import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { routes, store, useAppDispatch, useAppSelector } from "./core";
import RequireAuth from "./core/RequireAuth";
import  { useEffect } from "react";
import { useAuthentication } from "./packages/feat-Auth/authUtils";
import { ConnectSocket } from "./packages";

const SocketInit = (props: any) => {
  console.log("SocketInit Rendering !!")
  const socket = useAppSelector((state) => state.socket);
  const isAuthenticated = useAuthentication();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (isAuthenticated && !socket.isConnected) {
      dispatch(ConnectSocket());
    }
  
  }, [isAuthenticated]);

  return props.children;
};


function App() {
  console.log("App Rendering !!")
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
