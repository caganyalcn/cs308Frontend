import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { favorites, addToFavorites, removeFromFavorites, cart, addToCart, removeFromCart } = useContext(AppContext);

  // Ürün favorilerde mi kontrol et
  const isFavorited = favorites.some(fav => fav.id === product.id);
  const isInCart = cart.some(item => item.id === product.id); // Ürün sepette mi?

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleHeartClick = (e) => {
    e.stopPropagation(); // Kartın genel tıklamasını engelle
    if (isFavorited) {
      removeFromFavorites(product.id); // Favorilerden çıkar
    } else {
      addToFavorites(product); // Favorilere ekle
    }
  };

  const handleCartClick = (e) => {
    e.stopPropagation();
    if (isInCart) {
      removeFromCart(product.id); // Sepetten çıkar
    } else {
      addToCart(product); // Sepete ekle
    }
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      {/* Kalp butonu - Renk değiştirerek favori durumunu gösterecek */}
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

      {/* Sepete Ekle/Çıkar butonu */}
      <button className="add-to-cart" onClick={handleCartClick}>
        {isInCart ? "Sepetten Çıkar" : "Sepete Ekle"}
      </button>
    </div>
  );
};

export default ProductCard;

