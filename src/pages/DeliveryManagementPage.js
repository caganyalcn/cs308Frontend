import React, { useState, useEffect } from "react";
import { FaTruck, FaBox, FaUser, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/DeliveryManagementPage.css";

const API = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

const STATUS_OPTIONS = [
  { value: "processing", label: "İşleniyor" },
  { value: "in-transit", label: "Yolda" },
  { value: "delivered", label: "Teslim Edildi" }
];

const DeliveryManagementPage = () => {
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await fetch(`${API}/api/orders/delivery-list/`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 401) {
        navigate('/');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        if (typeof errorData === 'object' && errorData !== null && errorData.error) {
             throw new Error(errorData.error);
        } else {
             throw new Error('Teslimat listesi alınamadı');
        }
      }

      const data = await response.json();
      setDeliveries(data.deliveries || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${API}/api/orders/update-status/${id}/`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Durum güncellenemedi');
      }

      // Refresh the deliveries list after successful update
      fetchDeliveries();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="delivery-container">
        <div className="delivery-header">
          <h1 className="delivery-title">Teslimat Yönetimi</h1>
          <p className="delivery-subtitle">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="delivery-container">
      <div className="delivery-header">
        <h1 className="delivery-title">Teslimat Yönetimi</h1>
        <p className="delivery-subtitle">
          Tüm teslimatları görüntüleyin ve durumlarını güncelleyin
        </p>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="delivery-card">
        <h2 className="delivery-list-title">Teslimat Listesi</h2>

        <div className="delivery-table-wrapper">
          <table className="delivery-table">
            <thead>
              <tr>
                <th><FaBox /> ID</th>
                <th><FaUser /> Müşteri</th>
                <th><FaBox /> Ürünler</th>
                <th><FaMoneyBillWave /> Tutar</th>
                <th><FaMapMarkerAlt /> Adres</th>
                <th><FaTruck /> Durum</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((delivery) => (
                <tr key={delivery.delivery_id}>
                  <td>#{delivery.delivery_id}</td>
                  <td>{delivery.customer_name}</td>
                  <td>
                    {delivery.items.map((item, index) => (
                      <div key={index}>
                        {item.product_name} x{item.quantity}
                      </div>
                    ))}
                  </td>
                  <td>{delivery.total_price}₺</td>
                  <td>{delivery.delivery_address}</td>
                  <td>
                    <select
                      value={delivery.status}
                      onChange={(e) => updateStatus(delivery.delivery_id, e.target.value)}
                      className="status-select"
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeliveryManagementPage;
