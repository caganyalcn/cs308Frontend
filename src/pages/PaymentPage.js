import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PaymentPage.css";

const API = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000"; // Define API constant

function PaymentPage() {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number to remove spaces
    if (name === "cardNumber") {
      const formatted = value.replace(/\D/g, '').substring(0, 16);
      setPaymentDetails({ ...paymentDetails, cardNumber: formatted });
      return;
    }
    
    // Format expiry date
    if (name === "expiryDate") {
      let formatted = value.replace(/\D/g, '');
      if (formatted.length > 2) {
        formatted = formatted.substring(0, 2) + '/' + formatted.substring(2, 4);
      }
      setPaymentDetails({ ...paymentDetails, expiryDate: formatted });
      return;
    }
    
    // Format CVV to allow only digits
    if (name === "cvv") {
      const formatted = value.replace(/\D/g, '').substring(0, 3);
      setPaymentDetails({ ...paymentDetails, cvv: formatted });
      return;
    }
    
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    
    if (!/^\d{16}$/.test(paymentDetails.cardNumber)) {
      errors.cardNumber = "Kart numarası 16 haneli olmalıdır.";
    }
    
    if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)) {
      errors.expiryDate = "Geçerlilik tarihi MM/YY formatında olmalıdır.";
    }
    
    if (!/^\d{3}$/.test(paymentDetails.cvv)) {
      errors.cvv = "CVV kodu 3 haneli olmalıdır.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    console.log("Payment submitted!");

    // Validate form before sending
    if (!validateForm()) {
      return;
    }

    try {
      // Send credit card details to backend to save
      // Use the new endpoint and include credentials
      const saveCardResponse = await fetch(`${API}/api/products/save-credit-card-details/`, {
        method: "POST",
        credentials: "include", // Important for sending session cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          card_number: paymentDetails.cardNumber,
          cvv: paymentDetails.cvv,
          expiry_date: paymentDetails.expiryDate,
          card_holder_name: paymentDetails.cardName,
        }),
      });

      if (!saveCardResponse.ok) {
        const errorData = await saveCardResponse.json();
        console.error("Failed to save credit card details:", errorData);
        // As per instruction, continue with payment even if saving card details fails
        // In a real application, you might want to handle this more robustly
      }

      // Proceed with placing the order using the original endpoint
      const orderResponse = await fetch("http://localhost:8000/api/orders/place/", {
        method: "POST",
        credentials: "include", // Important for sending session cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // Assuming order placement doesn't need card details here
      });

      if (orderResponse.ok) {
        navigate("/payment-success");
      } else {
        const data = await orderResponse.json();
        alert(data.error || "Ödeme başarısız oldu!");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
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
        <button type="submit" className="payment-button">Ödemeyi Tamamla</button>
      </form>
    </div>
  );
}

export default PaymentPage;
