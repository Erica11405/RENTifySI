import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminSidebar from '../admin/AdminSidebar';
import './Admin.css';

const AdminLayout = ({ children }) => {
  const isAdmin = localStorage.getItem('adminToken');
  
  // Redirect to login 
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content-wrapper">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
