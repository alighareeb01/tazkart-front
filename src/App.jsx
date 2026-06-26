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

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/events", element: <Events /> },
      {
        path: "/profile",
        element: (
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        ),
      },
      { path: "/events/:id", element: <Event /> },
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
      { path: "/forget-password", element: <ForgetPassword /> },
      { path: "/reset-password/:token", element: <ResetPassword /> },
    ],
  },
]);

function App() {
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
