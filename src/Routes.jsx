import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Forum from "./pages/forum/Forum";
import AllTrainers from "./pages/allTrainers/AllTrainers";
import TrainerDetails from "./pages/trainerDetails/TrainerDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forum",
        element: <Forum />,
      },
      {
        path: "/allTrainers",
        element: <AllTrainers />,
      },
      {
        path: "/trainer/:id",
        element: <TrainerDetails />,
      },
    ],
  },
]);

export default router;
