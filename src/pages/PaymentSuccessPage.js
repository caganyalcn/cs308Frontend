import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/PaymentSuccessPage.css";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/home");
  };

  return (
    <div className="payment-success-container">
      <Header />
      <div className="success-content">
        <div className="success-icon">✓</div>
        <h1>Ödemeniz Başarıyla Tamamlandı!</h1>
        <p>Satın aldığınız ürünler en kısa sürede kargoya verilecektir.</p>
        <button onClick={handleContinueShopping} className="continue-shopping-btn">
          Alışverişe Devam Et
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage; 