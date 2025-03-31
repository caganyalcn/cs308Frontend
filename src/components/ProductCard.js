// src/components/ProductCard.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { favorites, addToFavorites, removeFromFavorites, cart, addToCart, removeFromCart } = useContext(AppContext);

  const isFavorited = favorites.some(fav => fav.id === product.id);
  const isInCart = cart.some(item => item.id === product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    if (isFavorited) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleCartClick = (e) => {
    e.stopPropagation();
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div 
        className="heart-icon" 
        onClick={handleHeartClick} 
        style={{ color: isFavorited ? "red" : "gray", fontSize: "24px", cursor: "pointer", position: "absolute", top: "10px", right: "10px" }}
      >
        ❤
      </div>

      <img src={product.image} alt={product.name} className="product-image" />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">{product.price}</p>
      <p className="product-description">{product.description}</p>
      <p className="product-rating">⭐ {product.rating}</p>
      <p className="product-stock">
        {product.stock > 0 ? `Stokta: ${product.stock} adet` : "Tükendi"}
      </p>

      <button
        className="add-to-cart"
        onClick={handleCartClick}
        disabled={product.stock === 0}
      >
        {isInCart ? "Sepetten Çıkar" : "Sepete Ekle"}
      </button>
    </div>
  );
};

export default ProductCard;
