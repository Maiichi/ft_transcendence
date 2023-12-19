import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { ModalComponent, routes, store, useAppDispatch, useAppSelector } from "./core";
import RequireAuth from "./core/RequireAuth";
import { useEffect, useState } from "react";
import { useAuthentication } from "./packages/feat-Auth/authUtils";
import { ConnectSocket } from "./packages";
import { SnackBarComponent } from "./core/utils/components/SnackBar";
import { setOpenErrorSnackbar } from "./core/CoreSlice";
import { InvitationGameModal } from "./core/utils/components/InvitationGameModal";
import { Socket } from "socket.io-client";
import { getSocketInstance, initializeSocket } from "./packages/feat-Game/socketUtils";

export const SocketInit = (props: any) => {
  const socket = useAppSelector((state) => state.socket);
  const isAuthenticated = useAuthentication();
  const dispatch =  useAppDispatch();

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

const GameInvitationModal = () => {
  const inviteReceived = useAppSelector((state) => state.gameState.inviteReceived);
  const displayGameInviteModal = useAppSelector((state) => state.core.displayGameInvitation);
  // properties for modal
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
    if (!displayGameInviteModal)
      handleClose();
  }, [displayGameInviteModal]);

  useEffect(() => {
    // Check if an invitation has been received
    if (inviteReceived) {
      // Display the modal when an invitation is received
      handleClickModal(<InvitationGameModal handleClose={handleClose}/>);
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
}

// function App() {
//   return (
//     <Provider store={store}>
//       <HandleError />
//       <BrowserRouter>
//         <GameInvitationModal />
//         <Routes>
//           {routes.map((item) => (
//             <Route
//               key={item.path}
//               path={item.path}
//               element={
//                 item.path === '/game' ? (
//                   // if the route is the 'game' route, don't wrap it with SocketInit
//                   // this is because the route game has a specific gateway so it can't be wraped inside the socketInit
//                     item?.requireAuth ? (
//                       <RequireAuth>{item.element}</RequireAuth>
//                     ) : (
//                       item.element
//                     )
//                 ) : (
//                   // Wrap all other routes with SocketInit
//                   <SocketInit>
//                     {item?.requireAuth ? (
//                       <RequireAuth>{item.element}</RequireAuth>
//                     ) : (
//                       item.element
//                     )}
//                   </SocketInit>
//                 )
//               } 
//             />
//           ))}
//         </Routes>
//       </BrowserRouter>
//     </Provider>
//   );
// }
function App() {
  return (
    <Provider store={store}>
      <HandleError />
      <SocketInit>
        <BrowserRouter>
          <GameInvitationModal />
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
