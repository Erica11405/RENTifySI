import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const UserLayout = ({ children }) => {
  return (
    <div className="user-layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;