import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
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
        />
      </div>
      
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><a href="#cars">Cars</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><Link to="/">Profile</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
