import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { routes, store, useAppDispatch, useAppSelector } from "./core";
import RequireAuth from "./core/RequireAuth";
import { useEffect } from "react";
import { useAuthentication } from "./packages/feat-Auth/authUtils";
import { ConnectSocket } from "./packages";
import { SnackBarComponent } from "./core/utils/components/SnackBar";
import { setOpenErrorSnackbar } from "./core/CoreSlice";
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
  const error = useAppSelector((state) => state.core.serverError);
  const dispatch = useAppDispatch();
  const openErrorSnackbar = useAppSelector(
    (state) => state.core.openErrorSnackbar
  );
  const handleClose = () => {
    dispatch(setOpenErrorSnackbar(false));
  };
  return (
    <>
      {error && (
        <SnackBarComponent
          msgError={error}
          open={openErrorSnackbar}
          severity="error"
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
