import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("adminToken", "dummy_token");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;