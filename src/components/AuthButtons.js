// src/components/AuthButtons.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../AppContext';
import '../styles/AuthButtons.css';

const AuthButtons = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isAuthenticated) {
    return (
      <div className="auth-buttons">
        <button onClick={() => navigate("/hesabim")} className="account-button">
          Hesabım
        </button>
        <button onClick={logout} className="logout-button">
          Çıkış Yap
        </button>
      </div>
    );
  }

  return (
    <div className="auth-buttons" ref={dropdownRef}>
      <button 
        className="auth-toggle-button"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        Giriş Yap / Kayıt Ol
      </button>
      {showDropdown && (
        <div className="auth-dropdown">
          <button onClick={() => {
            setShowDropdown(false);
            navigate("/");
          }}>
            Giriş Yap
          </button>
          <button onClick={() => {
            setShowDropdown(false);
            navigate("/register");
          }}>
            Kayıt Ol
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
