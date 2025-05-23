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
    fetchOrders();
  }, [navigate]);

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

  const handleReturnRequest = () => {
    // navigate("/return"); // We will handle the refund request on this page later
    console.log("İade Talebi clicked - future implementation here");
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm(`Sipariş #${orderId} iptal etmek istediğinize emin misiniz?`)) return;

    try {
      const response = await fetch(`${API}/api/orders/${orderId}/cancel/`, {
        method: 'POST', // or 'PUT' depending on backend implementation, POST is fine for this case
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle backend errors (e.g., status is not processing)
        setError(data.error || 'Sipariş iptal edilirken bir hata oluştu.');
      } else {
        // Handle success
        console.log(data.message);
        // After successful cancellation, refetch orders to update the list
        fetchOrders();
        setError(null); // Clear any previous errors
      }
    } catch (error) {
      console.error(`Error cancelling order ${orderId}:`, error);
      setError('Ağ hatası veya başka bir hata oluştu.');
    }
  };

  const getStatusClass = (status) => {
    if (status === "in-transit") return "in-transit";
    if (status === "delivered") return "delivered";
    if (status === "cancelled") return "cancelled";
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
                {/* Removed Details button */}
                {order.status !== "delivered" ? (
                  <button className="cancel-button" onClick={() => handleCancelOrder(order.order_id)}> {/* Renamed and repurposed Kargo Takibi */}
                    Siparişi İptal Et
                  </button>
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