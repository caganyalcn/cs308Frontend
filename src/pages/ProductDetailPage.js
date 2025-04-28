// src/pages/ProductDetailPage.js
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import { AppContext } from "../AppContext";
import "../styles/ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { products, cart, addToCart, removeFromCart, favorites, addToFavorites, removeFromFavorites } = useContext(AppContext);
  const [isInCart, setIsInCart] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  // Load saved ratings from localStorage and check cart status
  useEffect(() => {
    if (product) {
      // Check if product is in cart
      setIsInCart(cart.some(item => item.id === product.id));
    }
  }, [cart, product]);

  if (!product) {
    return (
      <div style={{ marginTop: "100px" }}>
        <Header />
        <h2>Ürün Bulunamadı</h2>
      </div>
    );
  }

  const isFavorited = favorites.some(fav => fav.id === product.id);

  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleCartClick = () => {
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
    setIsInCart(!isInCart);
  };

  // Generate stars for ratings display
  const renderStars = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5
    
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(roundedRating)) {
        // Full star
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i - 0.5 === roundedRating) {
        // Half star
        stars.push(<span key={i} className="star half-filled">★</span>);
      } else {
        // Empty star
        stars.push(<span key={i} className="star">☆</span>);
      }
    }
    return stars;
  };

  const formatPrice = (price) => {
    return typeof price === 'number' 
      ? price.toLocaleString('tr-TR', { minimumFractionDigits: 2 }) + ' TL'
      : price;
  };

  return (
    <div className="product-detail-container">
      <Header />
      <div className="product-detail">
        <img src={product.image_url} alt={product.name} />
        <div className="detail-info">
          <h2>{product.name}</h2>
          <p className="detail-price">{formatPrice(product.price)}</p>
          <p className="detail-description">{product.description}</p>
          
          <div className="detail-rating-display">
            <div className="stars-display">
              {renderStars(product.avg_rating)}
            </div>
            <span className="rating-value">{product.avg_rating?.toFixed(1) ?? "-"}</span>
            <span className="rating-count">({product.rating_count} değerlendirme)</span>
            <Link to={`/product/${product.id}/ratings`} className="view-all-link">
              Tüm Değerlendirmeleri Gör
            </Link>
          </div>
          
          <p className="detail-stock">Stokta: {product.stock_quantity > 0 ? `${product.stock_quantity} adet` : "Tükendi"}</p>

          <button 
            onClick={handleCartClick} 
            className="detail-button" 
            style={{ background: isInCart ? "#dc3545" : "#01048f", color: "white" }}
            disabled={product.stock_quantity === 0}
          >
            {isInCart ? "Sepetten Çıkar" : "Sepete Ekle"}
          </button>

          <button 
            onClick={handleFavoriteClick} 
            className="detail-button" 
            style={{ background: isFavorited ? "#6c757d" : "#343a40", color: "white", marginBottom: "20px" }}
          >
            {isFavorited ? "Favorilerden Çıkar" : "Favorilere Ekle"}
          </button>
          
          <div className="product-actions">
            <Link to={`/product/${product.id}/ratings/add`} className="action-link">
              Bu Ürünü Değerlendir
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;