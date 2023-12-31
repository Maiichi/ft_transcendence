import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import {
  ModalComponent,
  routes,
  store,
  useAppDispatch,
  useAppSelector,
} from "./core";
import RequireAuth, { Public } from "./core/RequireAuth";
import { useEffect, useState } from "react";
import { useAuthentication } from "./packages/feat-Auth/authUtils";
import { ConnectSocket } from "./packages";
import { SnackBarComponent } from "./core/utils/components/SnackBar";

import { InvitationGameModal } from "./packages/feat-Game/components/InvitationGameModal";
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

const GameInvitationModal = () => {
  const inviteReceived = useAppSelector((state) => state.game.inviteReceived);
  const displayGameInviteModal = useAppSelector(
    (state) => state.core.displayGameInvitation
  );
  const [open, setOpen] = useState(false);
  const [closeType, setCloseType] = useState<"auto" | "click" | undefined>(
    undefined
  );
  const [ChildModal, setChildModal] = useState<JSX.Element>(<></>);
  const handleClickModal = (
    childModal: JSX.Element,
    closeType?: "auto" | "click"
  ) => {
    setCloseType(closeType);
    setOpen(true);
    setChildModal(childModal);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!displayGameInviteModal) handleClose();
  }, [displayGameInviteModal]);

  useEffect(() => {
    // Check if an invitation has been received
    if (inviteReceived) {
      // Display the modal when an invitation is received
      handleClickModal(<InvitationGameModal handleClose={handleClose} />);
    }
  }, [inviteReceived]);

  return (
    <ModalComponent
      open={open}
      ChildComponent={ChildModal}
      handleClose={handleClose}
      closeType={closeType}
    />
  );
};
function App() {
  return (
    <Provider store={store}>
      <HandleError />
      <SocketInit>
        <BrowserRouter>
          <GameInvitationModal />
          <Routes>
            {routes.map((item, index) => (
              <Route
                key={`${index}-route-item`}
                path={item.path}
                element={
                  item?.requireAuth ? (
                    <RequireAuth>{item}</RequireAuth>
                  ) : (
                    <Public>{item}</Public>
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
