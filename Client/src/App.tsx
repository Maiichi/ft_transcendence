import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { routes, store, Header } from "./core";
import styled from "styled-components";

function App() {
  return (
    <Root>
      <Provider store={store}>
        <Header />
        <RouterProvider router={routes} />
      </Provider>
    </Root>
  );
}

const Root = styled.div``;

export default App;
