import React from "react";
import { Navigate } from "react-router-dom";

function AdminProtectRoute({ children }) {
  const isAdminLoggedIn = localStorage.getItem("adminId");

  if (!isAdminLoggedIn) return <Navigate to="/admin/login" replace />;

  return children;
}

export default AdminProtectRoute;
