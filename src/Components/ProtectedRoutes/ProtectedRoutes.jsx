import React, { useContext } from "react";

import { Navigate, useNavigate } from "react-router-dom";
import { TokenContext } from "../Context/TokenContext";
export default function ProtectedRoutes({ children }) {
  const { token } = useContext(TokenContext);

  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}
