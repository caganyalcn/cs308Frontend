// src/pages/RegisterPage.js
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/RegisterPage.css";
import logo from "../components/Logo.png";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Check password strength
    if (name === "password") {
      let strength = 0;
      if (value.length >= 8) strength += 1;
      if (/[A-Z]/.test(value)) strength += 1;
      if (/[0-9]/.test(value)) strength += 1;
      if (/[^A-Za-z0-9]/.test(value)) strength += 1;
      setPasswordStrength(strength);
    }

    if (name === "confirmPassword" || name === "password") {
      const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');
      confirmPasswordInput.setCustomValidity('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    setError("");
    setIsLoading(true);
    const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');

    if (formData.password !== formData.confirmPassword) {
      confirmPasswordInput.setCustomValidity('Passwords do not match');
      confirmPasswordInput.reportValidity();
      setIsLoading(false);
      return;
    }

    const requestData = {
      name: formData.firstName,
      surname: formData.lastName,
      email: formData.email,
      password: formData.password,
      delivery_address: formData.address
    };

    console.log('Sending request to:', `${API_BASE_URL}/api/accounts/signup/`);
    console.log('Request data:', requestData);

    try {
      const response = await fetch(`${API_BASE_URL}/api/accounts/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestData),
      });

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (response.ok) {
        // Store user data in localStorage or context if needed
        localStorage.setItem('user', JSON.stringify(responseData));
        navigate("/");
      } else {
        setError(responseData.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error details:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "#e0e0e0";
    if (passwordStrength === 1) return "#ff6b6b";
    if (passwordStrength === 2) return "#ffd166";
    if (passwordStrength === 3) return "#06d6a0";
    return "#118ab2";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "Very Weak";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Medium";
    if (passwordStrength === 3) return "Strong";
    return "Very Strong";
  };

  return (
    <div className="register-container">
      <div className="logo-container">
        <img
          src={logo}
          alt="Çiftlikbank Logo"
          className="logo-image"
        />
      </div>
      <h1>Create Your Account</h1>
      <p className="subtitle">Join Çiftlikbank and start your journey today</p>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="input-group">
            <label>First Name*</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Enter your first name"
              className={formData.firstName ? "filled" : ""}
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
              placeholder="Enter your last name"
              className={formData.lastName ? "filled" : ""}
            />
          </div>
        </div>
        
        <div className="input-group">
          <label>E-mail*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
            className={formData.email ? "filled" : ""}
          />
        </div>
        
        <div className="input-group">
          <label>Address*</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Enter your address"
            className={formData.address ? "filled" : ""}
          />
        </div>
        
        <div className="input-group">
          <label>Password*</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              placeholder="Create a strong password"
              className={formData.password ? "filled" : ""}
            />
            <button 
              type="button" 
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {formData.password && (
            <div className="password-strength">
              <div className="strength-bars">
                {[1, 2, 3, 4].map((level) => (
                  <div 
                    key={level} 
                    className="strength-bar"
                    style={{ 
                      backgroundColor: level <= passwordStrength ? getPasswordStrengthColor() : "#e0e0e0" 
                    }}
                  ></div>
                ))}
              </div>
              <span className="strength-text" style={{ color: getPasswordStrengthColor() }}>
                {getPasswordStrengthText()}
              </span>
            </div>
          )}
        </div>
        
        <div className="input-group">
          <label>Confirm Password*</label>
          <div className="password-input-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              className={formData.confirmPassword ? "filled" : ""}
            />
            <button 
              type="button" 
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        
        <button 
          type="submit" 
          className={`register-button ${isLoading ? "loading" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
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
