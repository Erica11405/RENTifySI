import React from "react";
import { Link } from "react-router-dom";

function Navbar( {searchQuery, setSearchQuery } ) {
  return (
    <nav className="navbar">
      <h2 className="logo">Rentify</h2>

      <div className="search-bar">
        <img
          src="/car/searchicon.png"
          alt="search icon"
          className="search-icon"
        />
        <input
          type="text"
          placeholder="Search cars..."
          className="search-input"
          value = {searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <ul className="nav-links">
        <li><Link to="/dashboard">Home</Link></li>
        <li><a href="#cars">Cars</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/notif">Notification</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
