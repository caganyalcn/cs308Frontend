import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/OrdersPage.css";
import { AppContext } from "../AppContext";

const API = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

const OrdersPage = ({ isEmbedded = false }) => {
  const navigate = useNavigate();

  // Orders from API
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API}/api/orders/all/`, { 
          method: 'GET', 
          credentials: 'include',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        });
        if (res.status === 401) { navigate('/'); return; }
        if (res.status === 404) { setError('Siparişler bulunamadı.'); setLoading(false); return; }
        if (!res.ok) { setError('Bir hata oluştu.'); setLoading(false); return; }
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        setError('Ağ hatası: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [navigate]);

  const handleReturnRequest = () => {
    navigate("/return");
  };
  
  const getStatusClass = (status) => {
    if (status === "shipped") return "shipped";
    if (status === "delivered") return "delivered";
    return "preparing";
  };

  return (
    <div className={isEmbedded ? "embedded-orders" : "orders-page"}>
      {!isEmbedded && <Header />}
      <h2 className="orders-title">Siparişlerim</h2>
      {/* loading, error or orders */}
      {loading ? (
        <p>Yükleniyor...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : orders.length === 0 ? (
        <p>Sipariş bulunamadı.</p>
      ) : (
        orders.map((order) => (
          <div key={order.order_id} className="order-item">
            <div className="order-header">
              <div className="order-number">Sipariş #{order.order_id}</div>
              <div className="order-date">
                {new Date(order.created_at).toLocaleString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            
            <div className="order-body">
              <div className="order-info">
                <p><strong>Ürün Sayısı:</strong> {order.items.length} ürün</p>
                <p><strong>Toplam Tutar:</strong> {order.total_price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</p>
              </div>
              
              <div className="order-status">
                <span className={`status ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>
            
            <div className="order-images">
              {order.items.map((item) => (
                <img key={item.product_id} src={item.image_url} alt={item.product_name} className="order-image" />
              ))}
            </div>
            
            <div className="order-footer">
              <div className="order-total">{order.total_price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</div>
              <div className="action-buttons">
                <button className="details-button">Detayları Gör</button>
                {order.status !== "delivered" ? (
                  <button className="track-button">Kargo Takibi</button>
                ) : null}
                <button className="return-button" onClick={handleReturnRequest}>
                  İade Talebi
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;