import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { favorites, addToFavorites, removeFromFavorites, cart, addToCart, removeFromCart, updateQuantity } = useContext(AppContext);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const [quantity, setQuantity] = useState(1);

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
      setShowQuantitySelector(true);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, quantity);
    setShowQuantitySelector(false);
    setQuantity(1);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setShowQuantitySelector(false);
    setQuantity(1);
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

      {!showQuantitySelector ? (
        <button
          className="add-to-cart"
          onClick={handleCartClick}
          disabled={product.stock === 0}
        >
          {isInCart ? "Sepetten Çıkar" : "Sepete Ekle"}
        </button>
      ) : (
        <div className="quantity-selector" onClick={e => e.stopPropagation()}>
          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={handleQuantityChange}
            className="quantity-input"
          />
          <button onClick={handleAddToCart} className="confirm-quantity">
            Onayla
          </button>
          <button onClick={handleCancel} className="cancel-quantity">
            İptal
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard; 