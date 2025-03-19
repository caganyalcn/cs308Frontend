import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/ReturnPage.css";

const ReturnPage = () => {
  const navigate = useNavigate();
  const [selectedReason, setSelectedReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedReason) {
      alert("Lütfen bir iade sebebi seçin!");
      return;
    }
    setSubmitted(true);

    // 2 saniye sonra siparişler sayfasına yönlendir
    setTimeout(() => {
      navigate("/orders");
    }, 2000);
  };

  return (
    <div className="return-page">
      <Header />
      <div className="return-container">
        <h2>İade Talebi</h2>

        {submitted ? (
          <p className="success-message">✅ İade talebiniz alındı!</p>
        ) : (
          <>
            <p>Neden iade etmek istiyorsunuz?</p>
            <div className="return-options">
              <label>
                <input
                  type="radio"
                  name="return-reason"
                  value="Yanlış sipariş verdim"
                  onChange={(e) => setSelectedReason(e.target.value)}
                />
                Yanlış sipariş verdim
              </label>

              <label>
                <input
                  type="radio"
                  name="return-reason"
                  value="Beklediğim gibi gelmedi"
                  onChange={(e) => setSelectedReason(e.target.value)}
                />
                Beklediğim gibi gelmedi
              </label>

              <label>
                <input
                  type="radio"
                  name="return-reason"
                  value="Geç teslim edildi"
                  onChange={(e) => setSelectedReason(e.target.value)}
                />
                Geç teslim edildi
              </label>

              <label>
                <input
                  type="radio"
                  name="return-reason"
                  value="Ürün hasarlı veya eksik geldi"
                  onChange={(e) => setSelectedReason(e.target.value)}
                />
                Ürün hasarlı veya eksik geldi
              </label>
            </div>

            <button className="submit-return" onClick={handleSubmit}>
              İade Talebi Oluştur
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReturnPage;
