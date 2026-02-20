import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
    path: "*",
    element: <NotFound />,
  },
]);

const Routing = () => {
  return <RouterProvider router={router} />;
};

export default Routing;