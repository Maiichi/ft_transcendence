import { createBrowserRouter } from "react-router-dom";
import { Test, Home } from "../packages";

import { NotFoundError } from "./errors";
export const routes = createBrowserRouter([
  {
    path: "/test",
    element: <Test />,
    errorElement: <NotFoundError />,
  },
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundError />,
  },
]);
