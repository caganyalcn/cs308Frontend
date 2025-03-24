import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "./Logo.png";
import "../styles/Header.css";
import { FaUser, FaShoppingBasket, FaHeart } from "react-icons/fa";

const Header = ({ setSearchQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  //const [showAccountMenu, setShowAccountMenu] = useState(false);

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
    setSearchQuery(value); // Filtreleme burada da çalışsın
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
      </div>

      <div className="header-right">
        <button onClick={() => navigate("/favorites")} className="favorites-button">
          <FaHeart className="nav-icon" /> Favorilerim
        </button>
        <button onClick={() => navigate("/cart")} className="cart-button">
          <FaShoppingBasket className="nav-icon" /> Sepetim
        </button>

        <div className="account-menu">
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
