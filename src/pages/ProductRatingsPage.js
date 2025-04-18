// src/pages/ProductRatingsPage.js
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { AppContext } from "../AppContext";

const ProductRatingsPage = () => {
  const { id } = useParams();
  const { products } = useContext(AppContext);
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const product = products.find((p) => p.id === parseInt(id));
  
  useEffect(() => {
    if (product) {
      // Load ratings
      const savedRatings = localStorage.getItem(`product_${product.id}_ratings`);
      if (savedRatings) {
        const parsedRatings = JSON.parse(savedRatings);
        setRatings(parsedRatings);
        
        // Calculate average rating
        if (parsedRatings.length > 0) {
          const sum = parsedRatings.reduce((acc, curr) => acc + curr.rating, 0);
          const newAverage = ((product.rating * 1 + sum) / (parsedRatings.length + 1)).toFixed(1);
          setAverageRating(newAverage);
        } else {
          setAverageRating(product.rating);
        }
      } else {
        setAverageRating(product.rating);
      }
    }
  }, [product]);

  if (!product) {
    return (
      <div style={{ marginTop: "100px" }}>
        <Header />
        <h2>Ürün Bulunamadı</h2>
      </div>
    );
  }

  // Generate stars for ratings display
  const renderStars = (rating) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        // Full star
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i - 0.5 === rating && rating % 1 !== 0) {
        // Half star
        stars.push(<span key={i} className="star half-filled">★</span>);
      } else {
        // Empty star
        stars.push(<span key={i} className="star">☆</span>);
      }
    }
    return stars;
  };

  return (
    <div className="product-detail-container">
      <Header />
      <div className="ratings-page">
        <div className="page-header">
          <Link to={`/product/${product.id}`} className="back-link">← Ürüne Dön</Link>
          <h1>{product.name} - Değerlendirmeler</h1>
        </div>
        
        <div className="average-rating">
          <h2>Ortalama Değerlendirme</h2>
          <div className="detail-rating-display">
            <div className="stars-display">
              {renderStars(averageRating)}
            </div>
            <span className="rating-value">{averageRating}</span>
            <span className="rating-count">({ratings.length + 1} değerlendirme)</span>
          </div>
          
          <Link to={`/product/${product.id}/ratings/add`} className="action-link">
            Bu Ürünü Değerlendir
          </Link>
        </div>
        
        <div className="ratings-list">
          <h2>Tüm Değerlendirmeler</h2>
          
          {/* Original product rating */}
          <div className="rating-item">
            <div className="rating-header">
              <span className="rating-author">Sistem Değerlendirmesi</span>
            </div>
            <div className="rating-stars">
              {renderStars(product.rating)}
              <span className="rating-value">{product.rating}</span>
            </div>
          </div>
          
          {ratings.map((rating) => (
            <div key={rating.id} className="rating-item">
              <div className="rating-header">
                <span className="rating-author">{rating.userName}</span>
                <span className="rating-date">{rating.date}</span>
              </div>
              <div className="rating-stars">
                {renderStars(rating.rating)}
                <span className="rating-value">{rating.rating}</span>
              </div>
              {rating.comment && (
                <p className="rating-comment">{rating.comment}</p>
              )}
            </div>
          ))}
          
          {ratings.length === 0 && (
            <p className="no-ratings">Henüz kullanıcı değerlendirmesi yok. İlk değerlendirmeyi siz yapın!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductRatingsPage;