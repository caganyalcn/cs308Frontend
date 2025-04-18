// src/pages/RegisterPage.js
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/RegisterPage.css";
import logo from "../components/Logo.png";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === "confirmPassword" || name === "password") {
      const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');
      confirmPasswordInput.setCustomValidity('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');

    if (formData.password !== formData.confirmPassword) {
      confirmPasswordInput.setCustomValidity('Passwords do not match');
      confirmPasswordInput.reportValidity();
    } else {
      confirmPasswordInput.setCustomValidity('');
      // Kayıt işlemi (dummy)
      console.log("Kayıt olan kullanıcı:", formData);
      navigate("/home");
    }
  };

  return (
    <div className="register-container">
      <img
        src={logo}
        alt="Çiftlikbank Logo"
        style={{ width: "150px", height: "auto", display: "block", margin: "0 auto 20px" }}
      />
      <h1> Çiftlikbank - Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>First Name*</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            title="Please fill out this field"
          />
        </div>
        <div className="input-group">
          <label>Last Name*</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            title="Please fill out this field"
          />
        </div>
        <div className="input-group">
          <label>E-mail*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            title="Please fill out this field"
          />
        </div>
        <div className="input-group">
          <label>Password*</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            title="Please enter at least 6 characters"
          />
        </div>
        <div className="input-group">
          <label>Confirm Password*</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            title="Please enter the same password"
          />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
      <div className="navigation-links">
        <div className="login-link">
          <span>Already have an account? </span>
          <a href="#" onClick={() => navigate("/")}>Login</a>
        </div>
        <a href="#" className="guest-link" onClick={() => navigate("/home")}>
          Continue as Guest
        </a>
      </div>
    </div>
  );
}

export default RegisterPage;
