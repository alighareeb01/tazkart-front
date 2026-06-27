import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Events from "./Components/Events/Events";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import Event from "./Components/Event/Event";
import Bookings from "./Components/Bookings/Bookings";
import Edit from "./Components/Edit/Edit";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/RessetPassword/ResetPassword";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import Notfound from "./Components/Notfound/Notfound";
import LayoutAdmin from "./Components/LayoutAdmin/LayoutAdmin";
import { useSelector } from "react-redux";
import CreateEvent from "./Components/CreateEvent/CreateEvent";
import AdminRoute from "./Components/AdminRoute/AdminRoute";
import HotEvents from "./Components/HotEvents/HotEvents";

function App() {
  const role = useSelector((state) => state.logged.role);
  console.log("role", role);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: role === "admin" ? <LayoutAdmin /> : <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/signup", element: <Signup /> },
        { path: "/login", element: <Login /> },
        { path: "/events", element: <Events /> },
        { path: "/hot-events", element: <HotEvents /> },
        {
          path: "/profile",
          element: (
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/bookings",
          element: (
            <ProtectedRoutes>
              <Bookings />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/edit",
          element: (
            <ProtectedRoutes>
              <Edit />
            </ProtectedRoutes>
          ),
        },
        { path: "/events/:id", element: <Event /> },
        { path: "/forget-password", element: <ForgetPassword /> },
        { path: "/reset-password/:token", element: <ResetPassword /> },
        {
          path: "/create-event",
          element: (
            <AdminRoute>
              <CreateEvent />
            </AdminRoute>
          ),
        },
        { path: "/*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="dark"
        toastClassName="!bg-gray-900 !border !border-gray-700 !rounded-xl !text-white shadow-lg"
        bodyClassName="text-gray-200 font-medium"
        progressClassName="!bg-indigo-500"
      />
    </>
  );
}

export default App;
