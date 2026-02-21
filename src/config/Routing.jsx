import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components ko import karte waqt check karein ke path sahi hai
import Home from "../pages/Home";
import CountryDetails from "../pages/CountryDetail";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/country/:name",
    element: <CountryDetails />,
  },
  {
    // Yeh wildcard route hai, jab koi ghalat URL likhega tab chalega
    path: "*",
    element: <NotFound />,
  },
]);

const Routing = () => {
  return <RouterProvider router={router} />;
};

export default Routing;