import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Rentify</h2>

      <ul className="nav-links">
        <li>Home</li>
        <li>Cars</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

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
    </nav>
  );
}

export default Navbar;
