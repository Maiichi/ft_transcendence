import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { routes, store, useAppDispatch, useAppSelector } from "./core";
import RequireAuth from "./core/RequireAuth";
import React from "react";
import { useAuthentication } from "./packages/feat-Auth/authUtils";
import { ConnectSocket, disconnectSocket } from "./packages";

// interface RequireAuthProps {
//     children: React.FC;
// }

// const SocketInit: React.FC = ({ children }) => {
//     const isFirstLogin = useAppSelector((state) => state.auth.firstLogin);
//     const socket = useAppSelector((state) => state.socket);
//     const isAuthenticated = useAuthentication();
//     console.log("socket : ", socket);
//     const dispatch = useAppDispatch();
//     React.useEffect(() => {
//         if (isAuthenticated && !socket.isConnected) {
//             dispatch(ConnectSocket());
//         }
//         return () => {
//             dispatch(disconnectSocket());
//         };
//     }, [isAuthenticated]);
//     if (!socket.isConnected) {
//     }
//     return <>{children}</>;
// };

function App() {
    console.log("app Rendering");
    return (
        <Provider store={store}>
            {/* <SocketInit> */}
                <BrowserRouter>
                    <Routes>
                        {routes.map((item) => (
                            <Route
                                path={item.path}
                                element={
                                    item?.requireAuth ? (
                                        <RequireAuth>
                                            {item.element}
                                        </RequireAuth>
                                    ) : (
                                        item.element
                                    )
                                }
                            />
                        ))}
                    </Routes>
                </BrowserRouter>
            {/* </SocketInit> */}
        </Provider>
    );
}

export default App;
