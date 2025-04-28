import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/PaymentSuccessPage.css";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/orders/latest/', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched latest order:', data);
        setOrder(data);
      })
      .catch((error) => console.error('Error fetching latest order:', error));
  }, []);

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
        {order && (
          <div className="invoice">
            <h2>Invoice - Order #{order.order_id}</h2>
            <p>Order Date: {new Date(order.created_at).toLocaleString()}</p>
            <p>Total Price: ${order.total_price.toFixed(2)}</p>
            <p>Delivery Address: {order.delivery_address}</p>
            <p>Status: {order.status}</p>
            <h3>Items:</h3>
            <ul className="invoice-items">
              {order.items.map((item) => (
                <li key={item.product_id} className="invoice-item">
                  <img src={item.image_url} alt={item.product_name} className="item-image" />
                  <div className="item-details">
                    <p className="item-name">{item.product_name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price Each: ${item.price_each.toFixed(2)}</p>
                    <p>Total: ${(item.quantity * item.price_each).toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button onClick={handleContinueShopping} className="continue-shopping-btn">
          Alışverişe Devam Et
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;