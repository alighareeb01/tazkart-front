import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
      <Navbar />

      <main className="flex-1 ">
        <Outlet />
      </main>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
