// ----------- import external dependencies -------------
import React from "react";
import { createBrowserRouter } from "react-router-dom";

// ----------- import internal dependncies ------------
import Login from "../views/login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);
