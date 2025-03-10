// src/components/ProductCard.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToFavorites, addToCart } = useContext(AppContext);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleHeartClick = (e) => {
    e.stopPropagation(); // Kartın genel tıklamasını engelle
    addToFavorites(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="heart-icon" onClick={handleHeartClick}>❤</div>
      <img src={product.image} alt={product.name} className="product-image" />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">{product.price}</p>
      <button className="add-to-cart" onClick={handleAddToCart}>
        Sepete Ekle
      </button>
    </div>
  );
};

export default ProductCard;
