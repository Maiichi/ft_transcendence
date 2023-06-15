import { createBrowserRouter } from "react-router-dom";
import { Home } from "../packages";

import { NotFoundError } from "./errors";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundError />,
  },
  {
    path: "/",
    element: "",
    errorElement: "",
  },
]);
