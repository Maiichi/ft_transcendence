import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { routes, store, useAppDispatch, useAppSelector } from "./core";
import RequireAuth from "./core/RequireAuth";
import { useEffect } from "react";
import { useAuthentication } from "./packages/feat-Auth/authUtils";
import { ConnectSocket } from "./packages";
import { SnackBarComponent } from "./core/utils/components/SnackBar";
import { setOpenSnackbar } from "./core/CoreSlice";
const SocketInit = (props: any) => {
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
const HandleError = () => {
  const serverMessage = useAppSelector((state) => state.core.serverMessage);
  const severity = useAppSelector((state) => state.core.severity);
  const dispatch = useAppDispatch();
  const openSnackbar = useAppSelector((state) => state.core.openSnackbar);
  const handleClose = () => {
    dispatch(setOpenSnackbar(false));
  };
  return (
    <>
      {serverMessage && (
        <SnackBarComponent
          msgError={serverMessage}
          open={openSnackbar}
          severity={severity}
          handleClose={handleClose}
        />
      )}
    </>
  );
};
function App() {
  return (
    <Provider store={store}>
      <HandleError />
      <SocketInit>
        <BrowserRouter>
          <Routes>
            {routes.map((item) => (
              <Route
                path={item.path}
                element={
                  item?.requireAuth ? (
                    <RequireAuth>{item}</RequireAuth>
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
