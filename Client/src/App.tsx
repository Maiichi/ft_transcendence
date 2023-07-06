import { RouterProvider } from "react-router-dom";
import { routes } from "./core";
import { Provider } from "react-redux";
import { store } from "./core/redux/store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </div>
  );
}

export default App;
