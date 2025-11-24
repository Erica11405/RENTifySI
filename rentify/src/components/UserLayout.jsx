import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const UserLayout = ({ children }) => {
  return (
    <div className="user-layout">
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;