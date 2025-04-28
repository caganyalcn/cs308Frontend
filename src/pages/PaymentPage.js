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

  const handlePayment = async (e) => {
    e.preventDefault();
    console.log("Payment submitted!");

    // Optionally, validate paymentDetails here

    // Send the address to the backend (if you want to use it)
    const res = await fetch("http://localhost:8000/api/orders/place/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: paymentDetails.address, // You can add more fields if your backend expects them
      }),
    });

    if (res.ok) {
      // Optionally, clear payment form here
      navigate("/payment-success");
    } else {
      const data = await res.json();
      alert(data.error || "Ödeme başarısız oldu!");
    }
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
      <button onClick={() => alert("Test handler works!")}>Test Handler</button>
    </div>
  );
}

export default PaymentPage;
