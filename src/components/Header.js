// src/components/Header.js
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./Logo.png";
import "../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    alert("Arama özelliği henüz eklenmedi!");
  };

  return (
    <div className="header-container">
      <div className="logo-container" onClick={() => navigate("/home")}>
        <img src={logo} alt="Çiftlikbank Logo" className="logo" />
        <h1>Çiftlik Bank</h1>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Ürün ara..."
          className="search-input"
        />
        <button className="search-button" onClick={handleSearch}>Ara</button>
      </div>

      <div className="header-right">
        <button onClick={() => navigate("/favorites")} className="favorites-button">
          Favorilerim
        </button>
        <button onClick={() => navigate("/cart")} className="cart-button">
          Sepetim
        </button>
      </div>
    </div>
  );
};

export default Header;
