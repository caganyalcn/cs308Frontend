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
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const product = products.find((p) => p.id === parseInt(id));

  const handleRatingClick = (rating) => {
    setUserRating(rating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userRating === 0) {
      setErrorMessage("Lütfen bir puan seçiniz.");
      return;
    }

    if (userName.trim() === "") {
      setErrorMessage("Lütfen adınızı giriniz.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/reviews/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: parseInt(id),
          username: userName,
          email: userEmail,
          rating: userRating,
          comment: comment,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Değerlendirme gönderildi!");
        setTimeout(() => navigate(`/product/${id}/ratings`), 2000);
      } else {
        const data = await response.json();
        setErrorMessage(data.error || "Bir hata oluştu.");
      }
    } catch (error) {
      setErrorMessage("Sunucuya bağlanılamadı.");
    }
  };

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

  if (!product) {
    return (
      <div style={{ marginTop: "100px" }}>
        <Header />
        <h2>Ürün Bulunamadı</h2>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <Header />
      <div className="add-rating-page">
        <div className="page-header">
          <Link to={`/product/${product.id}/ratings`} className="back-link">
            ← Değerlendirmelere Dön
          </Link>
          <h1>{product.name} - Değerlendirme Ekle</h1>
        </div>

        <form onSubmit={handleSubmit} className="rating-form">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}

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
      </div>
    </div>
  );
};

export default AddRatingPage;
