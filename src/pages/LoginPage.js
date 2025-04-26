// src/pages/LoginPage.js
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import "../styles/LoginPage.css";
import logo from "../components/Logo.png";
import { AppContext } from "../AppContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(email, password);
    
    if (result.success) {
      if (result.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } else {
      setError(result.message || "An error occurred. Please try again later.");
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
