import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/OrdersPage.css";

const OrdersPage = ({ isEmbedded = false }) => {
  const navigate = useNavigate();

  // Orders data
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

  const handleReturnRequest = () => {
    navigate("/return");
  };
  
  const getStatusClass = (status) => {
    if (status === "Kargoya Verildi") return "shipped";
    if (status === "Teslim Edildi") return "delivered";
    return "preparing";
  };

  return (
    <div className={isEmbedded ? "embedded-orders" : "orders-page"}>
      {!isEmbedded && <Header />}
      <h2 className="orders-title">Siparişlerim</h2>

      {orders.map((order) => (
        <div key={order.id} className="order-item">
          <div className="order-header">
            <div className="order-number">Sipariş #{order.id}</div>
            <div className="order-date">{order.date}</div>
          </div>
          
          <div className="order-body">
            <div className="order-info">
              <p><strong>Ürün Sayısı:</strong> {order.items.length} ürün</p>
              <p><strong>Toplam Tutar:</strong> {order.total}</p>
            </div>
            
            <div className="order-status">
              <span className={`status ${getStatusClass(order.status)}`}>
                {order.status}
              </span>
            </div>
          </div>
          
          <div className="order-images">
            {order.items.map((item) => (
              <img key={item.id} src={item.image} alt="Ürün" className="order-image" />
            ))}
          </div>
          
          <div className="order-footer">
            <div className="order-total">{order.total}</div>
            <div className="action-buttons">
              <button className="details-button">Detayları Gör</button>
              {order.status !== "Teslim Edildi" ? (
                <button className="track-button">Kargo Takibi</button>
              ) : null}
              <button className="return-button" onClick={handleReturnRequest}>
                İade Talebi
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;