// src/pages/ProductRatingsPage.js
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import { AppContext } from "../AppContext";

const ProductRatingsPage = () => {
  const { id } = useParams();
  const { products } = useContext(AppContext);
  const [reviews, setReviews] = useState([]);
  const product = products.find((p) => p.id === parseInt(id));

  useEffect(() => {
    // Fetch reviews from backend
    fetch(`http://localhost:8000/api/reviews/product/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        // Only show reviews with a comment (approved by backend)
        setReviews(Array.isArray(data) ? data.filter(r => r.comment && r.comment.trim() !== "") : []);
      });
  }, [id]);

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
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i - 0.5 === rating && rating % 1 !== 0) {
        stars.push(<span key={i} className="star half-filled">★</span>);
      } else {
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
              {renderStars(product.avg_rating)}
            </div>
            <span className="rating-value">{product.avg_rating?.toFixed(1) ?? "-"}</span>
            <span className="rating-count">({product.rating_count} değerlendirme)</span>
          </div>
          <Link to={`/product/${product.id}/ratings/add`} className="action-link">
            Bu Ürünü Değerlendir
          </Link>
        </div>
        <div className="ratings-list">
          <h2>Tüm Değerlendirmeler</h2>
          {reviews.length === 0 && (
            <p className="no-ratings">Henüz kullanıcı değerlendirmesi yok. İlk değerlendirmeyi siz yapın!</p>
          )}
          {reviews.map((review) => (
            <div key={review.id} className="rating-item">
              <div className="rating-header">
                <span className="rating-author">{review.user?.name || "Kullanıcı"}</span>
                <span className="rating-date">{new Date(review.created_at).toLocaleString()}</span>
              </div>
              {review.rating && (
                <div className="rating-stars">
                  {renderStars(review.rating)}
                  <span className="rating-value">{review.rating}</span>
                </div>
              )}
              <p className="rating-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductRatingsPage;