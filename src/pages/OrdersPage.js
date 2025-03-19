import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/OrdersPage.css";

const OrdersPage = () => {
  const navigate = useNavigate();

  // Siparişler verisi
  const [orders] = useState([
    {
      id: 1,
      date: "17 Mart 2025 - 12:28",
      total: "3.039,80 TL",
      status: "Siparişiniz Hazırlanıyor",
      items: [
        { id: 101, image: "https://via.placeholder.com/50" },
        { id: 102, image: "https://via.placeholder.com/50" },
        { id: 103, image: "https://via.placeholder.com/50" },
      ],
    },
    {
      id: 2,
      date: "15 Mart 2025 - 12:16",
      total: "595 TL",
      status: "Kargoya Verildi",
      items: [
        { id: 104, image: "https://via.placeholder.com/50" },
      ],
    },
  ]);

  return (
    <div className="orders-page">
      <Header />
      <h2 className="orders-title">Siparişlerim</h2>

      {orders.map((order) => (
        <div key={order.id} className="order-item">
          <div className="order-info">
            <p><strong>Sipariş Tarihi:</strong> {order.date}</p>
            <p><strong>Tutar:</strong> {order.total}</p>
          </div>

          <div className="order-status">
            <p className={`status ${order.status === "Kargoya Verildi" ? "shipped" : "preparing"}`}>
              {order.status}
            </p>
          </div>

          <div className="order-images">
            {order.items.map((item) => (
              <img key={item.id} src={item.image} alt="Ürün" className="order-image" />
            ))}
          </div>

          <button className="return-button" onClick={() => navigate("/return")}>
            İade Talebi
          </button>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
