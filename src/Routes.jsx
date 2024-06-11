import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Forum from "./pages/forum/Forum";
import AllTrainers from "./pages/allTrainers/AllTrainers";
import TrainerDetails from "./pages/trainerDetails/TrainerDetails";
import TrainerBooking from "./pages/trainerBooking/TrainerBooking";
import Payment from "./pages/payment/Payment";
import BeATrainer from "./pages/beATrainer/BeATrainer";
import AllClasses from "./pages/allClasses/AllClasses";
import PostDetails from "./pages/forum/PostDetails";

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
      {
        path: "/booking/:id",
        element: <TrainerBooking />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/beATrainer",
        element: <BeATrainer />,
      },
      {
        path: "/allClasses",
        element: <AllClasses />,
      },
      {
        path: "/post/:id",
        element: <PostDetails />,
      },
    ],
  },
]);

export default router;
