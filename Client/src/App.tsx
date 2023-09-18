import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { routes, store } from "./core";
import RequireAuth from "./core/RequireAuth";

function App() {
  console.log("app Rendering");
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
