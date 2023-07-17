import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { routes, store } from "./core";
import styled from "styled-components";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {routes.map((item) => (
            <Route path={item.path} element={item.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
