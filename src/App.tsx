import { useState } from "react";

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Avoid from "./pages/Avoid";
import Confirm from "./pages/Confirm";
import Wordle from "./pages/Wordle";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          index: true,
          Component: Home,
        },
        {
          path: "avoid",
          Component: Avoid,
        },
        {
          path: "confirm",
          Component: Confirm,
        },
        {
          path: "wordle",
          Component: Wordle,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
