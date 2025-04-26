import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import "../styles/ProductCard.css";

const formatPrice = (price) => {
  return typeof price === "number"
    ? price.toLocaleString("tr-TR", { minimumFractionDigits: 2 }) + " TL"
    : price;
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const {
    favorites,
    addToFavorites,
    removeFromFavorites,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
  } = useContext(AppContext);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const isFavorited = favorites.some((fav) => fav.id === product.id);
  const isInCart = cart.some((item) => item.id === product.id);

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

  const handleCartClick = async (e) => {
    e.stopPropagation();
    if (isInCart) {
      await removeFromCart(product.id);
    } else {
      setShowQuantitySelector(true);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock_quantity) {
      setQuantity(value);
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    await addToCart(product, quantity);
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
        style={{
          color: isFavorited ? "red" : "gray",
          fontSize: "24px",
          cursor: "pointer",
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
      >
        ❤
      </div>

      <img src={product.image_url} alt={product.name} className="product-image" />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">{formatPrice(product.price)}</p>
      <p className="product-description">{product.description}</p>
      <p className="product-rating">⭐ {product.rating}</p>
      <p className="product-stock">
        {product.stock_quantity > 0
          ? `Stokta: ${product.stock_quantity} adet`
          : "Tükendi"}
      </p>

      {!showQuantitySelector ? (
        <button
          className="add-to-cart"
          onClick={handleCartClick}
          disabled={product.stock_quantity === 0}
        >
          {isInCart ? "Sepetten Çıkar" : "Sepete Ekle"}
        </button>
      ) : (
        <div className="quantity-selector" onClick={(e) => e.stopPropagation()}>
          <input
            type="number"
            min="1"
            max={product.stock_quantity}
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