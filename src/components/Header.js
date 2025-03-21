import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "./Logo.png";
import "../styles/Header.css";
import products from "../data/products";
import { FaUser, FaShoppingBasket, FaHeart } from "react-icons/fa";

const Header = ({ setSearchQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const handleGoBack = () => {
    if (location.pathname === "/return") {
      navigate("/orders");
    } else {
      navigate("/home");
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
          .some((word) => word.toLowerCase().startsWith(value.toLowerCase()))
      );

      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="header-container">
      {location.pathname !== "/home" && (
        <button className="back-button" onClick={handleGoBack}>
          ←
        </button>
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
                <img
                  src={product.image}
                  alt={product.name}
                  className="suggestion-image"
                />
                <span>{product.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="header-right">
        <button onClick={() => navigate("/favorites")} className="favorites-button">
          <FaHeart className="nav-icon" /> Favorilerim
        </button>
        <button onClick={() => navigate("/cart")} className="cart-button">
          <FaShoppingBasket className="nav-icon" /> Sepetim
        </button>

        <div className="account-menu">
          {/* Clicking this button now navigates to the account page */}
          <button
            className="account-button"
            onClick={() => navigate("/hesabim")} 
          >
            <FaUser className="nav-icon" /> Hesabım
          </button>


          
        </div>
      </div>
    </div>
  );
};

export default Header;
