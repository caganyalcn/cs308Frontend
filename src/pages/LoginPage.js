// src/pages/LoginPage.js
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import "../styles/LoginPage.css";
import logo from "../components/Logo.png";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

// Configure axios defaults
axios.defaults.withCredentials = true;

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API_BASE_URL}/api/accounts/login/`, {
        email,
        password
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = response.data;
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Check if user is admin and redirect accordingly
      if (data.is_admin) {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="login-container">
      <img
        src={logo}
        alt="Çiftlikbank Logo"
        style={{ width: "150px", height: "auto", display: "block", margin: "0 auto 20px" }}
      />
      <h1>Çiftlikbank - Login</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>E-mail*</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password*</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div className="navigation-links">
        <div className="signup-link">
          <span>Don't have an account? </span>
          <a href="#" onClick={() => navigate("/register")}>Sign Up</a>
        </div>
        <a href="#" className="guest-link" onClick={() => navigate("/home")}>
          Continue as Guest
        </a>
      </div>
    </div>
  );
}

export default LoginPage;
