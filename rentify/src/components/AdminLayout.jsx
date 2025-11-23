import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminSidebar from '../admin/AdminSidebar';
import './Admin.css';

const AdminLayout = ({ children }) => {
  const isAdmin = localStorage.getItem('adminToken');
  
  // Redirect to login if not authenticated
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      {/* ✅ FIXED: use the class that matches your CSS */}
      <main className="admin-content-wrapper">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
