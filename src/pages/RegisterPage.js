import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/RegisterPage.css"; // Importing styles

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

    // Clear custom validation message when user types in confirm password
    if (name === 'confirmPassword' || name === 'password') {
      const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');
      confirmPasswordInput.setCustomValidity('');
    }
  };

  const handleSubmit = (e) => {
    const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');
    
    if (formData.password !== formData.confirmPassword) {
      e.preventDefault();
      confirmPasswordInput.setCustomValidity('Passwords do not match');
      confirmPasswordInput.reportValidity();
    } else {
      confirmPasswordInput.setCustomValidity('');
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
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
        <button type="submit" className="register-button">Register</button>
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
