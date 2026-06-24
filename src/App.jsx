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

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/events", element: <Events /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);

function App() {
  useEffect(() => {
    async function getEvents() {
      const res = await fetch(
        "https://tazkarti-backend-production.up.railway.app/api/events?sort=-price",
      );
      const data = await res.json();
      console.log(data);
    }
    getEvents();
  }, []);

  return (
    <>
      <RouterProvider router={routes}>Home</RouterProvider>
    </>
  );
}

export default App;
