// src/pages/AddRatingPage.js
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { AppContext } from "../AppContext";

const AddRatingPage = () => {
  const { id } = useParams();
  const { products } = useContext(AppContext);
  const navigate = useNavigate();
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [hasRated, setHasRated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const product = products.find((p) => p.id === parseInt(id));
  
  // Check if user has already rated this product
  useEffect(() => {
    if (product) {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        // Generate random user ID if not exists
        const newUserId = `user_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('userId', newUserId);
      }
      
      // Check if user has rated this product before
      const savedRatings = localStorage.getItem(`product_${product.id}_ratings`);
      if (savedRatings) {
        const parsedRatings = JSON.parse(savedRatings);
        const userId = localStorage.getItem('userId');
        const userRating = parsedRatings.find(r => r.userId === userId);
        
        if (userRating) {
          setHasRated(true);
          setErrorMessage("Bu ürünü daha önce değerlendirdiniz. Her kullanıcı bir ürünü yalnızca bir kez değerlendirebilir.");
        }
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

  const handleRatingClick = (rating) => {
    setUserRating(rating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (userRating === 0) {
      setErrorMessage("Lütfen bir puan seçiniz.");
      return;
    }
    
    if (userName.trim() === "") {
      setErrorMessage("Lütfen adınızı giriniz.");
      return;
    }
    
    if (hasRated) {
      setErrorMessage("Bu ürünü daha önce değerlendirdiniz.");
      return;
    }
    
    // Get user ID
    const userId = localStorage.getItem('userId');
    
    // Create new rating object
    const newRating = {
      id: Date.now(),
      userId: userId,
      userName: userName,
      userEmail: userEmail,
      rating: userRating,
      comment: comment,
      date: new Date().toLocaleDateString('tr-TR')
    };
    
    // Save rating to localStorage
    const savedRatings = localStorage.getItem(`product_${product.id}_ratings`);
    const ratings = savedRatings ? JSON.parse(savedRatings) : [];
    ratings.push(newRating);
    localStorage.setItem(`product_${product.id}_ratings`, JSON.stringify(ratings));
    
    // Redirect to ratings page
    navigate(`/product/${product.id}/ratings`);
  };

  // Generate stars for ratings input
  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i}
          className={`star ${i <= (hoveredRating || userRating) ? "filled" : ""}`}
          onClick={() => handleRatingClick(i)}
          onMouseEnter={() => setHoveredRating(i)}
          onMouseLeave={() => setHoveredRating(0)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="product-detail-container">
      <Header />
      <div className="add-rating-page">
        <div className="page-header">
          <Link to={`/product/${product.id}/ratings`} className="back-link">← Değerlendirmelere Dön</Link>
          <h1>{product.name} - Değerlendirme Ekle</h1>
        </div>
        
        {hasRated ? (
          <div className="error-message">
            <p>{errorMessage}</p>
            <Link to={`/product/${product.id}/ratings`} className="action-link">
              Tüm Değerlendirmeleri Gör
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rating-form">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            
            <div className="form-group">
              <label>Puanınız</label>
              <div className="rating-input">
                {renderStars()}
                <span className="rating-label">
                  {userRating > 0 ? `${userRating}/5` : "Puanlamak için yıldızlara tıklayın"}
                </span>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="userName">Adınız *</label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="userEmail">E-posta Adresiniz</label>
              <input
                type="email"
                id="userEmail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="form-control"
              />
              <small>E-posta adresiniz görüntülenmeyecektir.</small>
            </div>
            
            <div className="form-group">
              <label htmlFor="comment">Yorumunuz (İsteğe Bağlı)</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="form-control"
                rows="5"
              ></textarea>
            </div>
            
            <button type="submit" className="submit-button">Değerlendirmeyi Gönder</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddRatingPage;