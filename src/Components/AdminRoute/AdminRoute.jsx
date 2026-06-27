import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const role = useSelector((state) => state.logged.role);
  console.log(role);

  if (role === "admin") {
    return children;
  }

  return <Navigate to="/" />;
}
