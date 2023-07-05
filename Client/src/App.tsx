import { RouterProvider } from "react-router-dom";
import { routes } from "./config";
import { Provider } from "react-redux";
import { store } from "./config/redux/store";

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
