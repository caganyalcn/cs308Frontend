import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PaymentPage.css";

function PaymentPage() {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    address: "",
  });

  const handleChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    // Here you would typically send the payment details to your backend
    // For now, we'll just navigate to the success page
    navigate("/payment-success");
  };

  return (
    <div className="payment-container">
      <h2>Ödeme Bilgileri</h2>
      <form onSubmit={handlePayment}>
        <div className="input-group">
          <label>Kart Üzerindeki İsim</label>
          <input
            type="text"
            name="cardName"
            value={paymentDetails.cardName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Kart Numarası</label>
          <input
            type="text"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleChange}
            required
            maxLength="16"
            pattern="\d{16}"
            title="Kart numarası 16 haneli olmalıdır."
          />
        </div>
        <div className="input-group">
          <label>Son Kullanma Tarihi</label>
          <input
            type="text"
            name="expiryDate"
            value={paymentDetails.expiryDate}
            onChange={handleChange}
            required
            placeholder="MM/YY"
            pattern="\d{2}/\d{2}"
            title="Geçerlilik tarihi MM/YY formatında olmalıdır."
          />
        </div>
        <div className="input-group">
          <label>CVV</label>
          <input
            type="text"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={handleChange}
            required
            maxLength="3"
            pattern="\d{3}"
            title="CVV kodu 3 haneli olmalıdır."
          />
        </div>
        <div className="input-group">
          <label>Teslimat Adresi</label>
          <textarea
            name="address"
            value={paymentDetails.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="payment-button">Ödemeyi Tamamla</button>
      </form>
    </div>
  );
}

export default PaymentPage;
