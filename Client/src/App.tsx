import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { routes, store} from "./core";
import RequireAuth from "./core/RequireAuth";
import { SocketProvider } from "./core/socket/socketContext";

function App() { 
    
    return (
        <Provider store={store}>
            <SocketProvider>
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
            </SocketProvider>
        </Provider>
    );
}

export default App;
