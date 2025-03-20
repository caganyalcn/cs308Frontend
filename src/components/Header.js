import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "./Logo.png";
import "../styles/Header.css";
import products from "../data/products";

const Header = ({ setSearchQuery }) => {
  const navigate = useNavigate();
  const location = useLocation(); // 🔹 Mevcut sayfanın URL'sini al

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  // Geri Git Butonu Fonksiyonu
  const handleGoBack = () => {
    if (location.pathname === "/return") {
      navigate("/orders"); // 🔹 Eğer iade talebi sayfasındaysan önce Siparişlerim sayfasına dön
    } else {
      navigate("/home"); // 🔹 Diğer tüm sayfalardan HomePage'e dön
    }
  };

  const handleSearch = () => {
    setSearchQuery(searchTerm);
    navigate("/home");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filtered = products.filter((product) =>
        product.name
          .split(" ")
          .some(word => word.toLowerCase().startsWith(value.toLowerCase()))
      );

      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="header-container">
      {/* 🔹 Geri Git Butonu (Sadece HomePage DEĞİLSE göster) */}
      {location.pathname !== "/home" && (
        <button className="back-button" onClick={handleGoBack}>←</button>
      )}

      <div className="logo-container" onClick={() => navigate("/home")}>
        <img src={logo} alt="Çiftlikbank Logo" className="logo" />
        <h1>Çiftlik Bank</h1>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Ürün ara..."
          className="search-input"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className="search-button" onClick={handleSearch}>
          Ara
        </button>

        {suggestions.length > 0 && (
          <div className="search-suggestions">
            {suggestions.map((product) => (
              <div
                key={product.id}
                className="suggestion-item"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img src={product.image} alt={product.name} className="suggestion-image" />
                <span>{product.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="header-right">
        <button onClick={() => navigate("/favorites")} className="favorites-button">
          Favorilerim
        </button>
        <button onClick={() => navigate("/cart")} className="cart-button">
          Sepetim
        </button>

        <div className="account-menu">
          <button 
            className="account-button"
            onClick={() => setShowAccountMenu(!showAccountMenu)}
          >
            Hesabım ▼
          </button>

          {showAccountMenu && (
            <div className="dropdown-menu">
              <button onClick={() => navigate("/orders")}>Siparişlerim</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
