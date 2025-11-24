import React from "react";
import { Navigate } from "react-router-dom";

function UserProtectRoute({ children }) {
  const isLoggedIn = localStorage.getItem("userId");

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return children;
}

export default UserProtectRoute;
