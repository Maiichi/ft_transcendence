import React from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./config";

function App() {
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
