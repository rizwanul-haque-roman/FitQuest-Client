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
import Dashboard from "./pages/dashboard/Dashboard";
import AllNewsletterSub from "./pages/dashboard/allNewsletterSub/AllNewsletterSub";
import DashboardAllTrainers from "./pages/dashboardAllTrainers/DashboardAllTrainers";
import AppliedTrainers from "./pages/dashboard/appliedTrainers/AppliedTrainers";
import ApplicantsDetails from "./pages/dashboard/appliedTrainers/ApplicantsDetails";
import Balance from "./pages/dashboard/balance/Balance";
import AddNewClass from "./pages/dashboard/addClass/AddNewClass";
import ManageSlots from "./pages/dashboard/TrainerRoutes/manageSlots/ManageSlots";
import AddNewSlot from "./pages/dashboard/TrainerRoutes/addNewSlot/AddNewSlot";
import AddForum from "./pages/dashboard/AddForum";

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
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/adminHome",
        element: <Balance />,
      },
      {
        path: "/dashboard/subscriber",
        element: <AllNewsletterSub />,
      },
      {
        path: "/dashboard/trainers",
        element: <DashboardAllTrainers />,
      },
      {
        path: "/dashboard/appliedtrainers",
        element: <AppliedTrainers />,
      },
      {
        path: "/dashboard/applicant/:id",
        element: <ApplicantsDetails />,
      },
      {
        path: "/dashboard/addClass",
        element: <AddNewClass />,
      },
      {
        path: "/dashboard/manageSlots",
        element: <ManageSlots />,
      },
      {
        path: "/dashboard/addNewSlot",
        element: <AddNewSlot />,
      },
      {
        path: "/dashboard/createForum",
        element: <AddForum />,
      },
    ],
  },
]);

export default router;
