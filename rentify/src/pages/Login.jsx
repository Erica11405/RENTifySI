import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ADDED THIS

function LogIn({ onSubmit }) { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ADDED THIS
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Temporary login logic (replace with Django API)
    if (email && password) {
      localStorage.setItem('userId', 'user123');
      navigate("/"); // Redirect to home after login
    }
    
    // If you have onSubmit prop, call it
    if (onSubmit) {
      onSubmit({ email, password });
    }
  };
  
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>User Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className="hero-btn" type="submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogIn;