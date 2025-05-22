import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/InvoiceManagementPage.css";

const API = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

const InvoiceManagementPage = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
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
        throw new Error('Fatura listesi alınamadı');
      }

      const data = await response.json();
      setInvoices(data.deliveries || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewInvoice = async (orderId) => {
    try {
      const response = await fetch(`${API}/api/orders/invoice/${orderId}/`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Fatura detayları alınamadı');
      }

      const data = await response.json();
      window.open(`${API}/api/orders/invoice/${orderId}/pdf/`, '_blank');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="invoice-page">
        <h2 className="invoice-title">Fatura Listesi</h2>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="invoice-page">
      <h2 className="invoice-title">Fatura Listesi</h2>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="invoice-grid">
        {invoices.map((invoice) => (
          <div key={invoice.delivery_id} className="invoice-card">
            <div className="invoice-header">
              <div className="invoice-meta">
                <p className="invoice-id">Fatura No: #{invoice.delivery_id}</p>
                <p className="invoice-customer">Müşteri: {invoice.customer_name}</p>
                <p className="invoice-date">Tarih: {new Date(invoice.created_at).toLocaleDateString('tr-TR')}</p>
              </div>
              <div className="invoice-total">
                Toplam: {invoice.total_price}₺
              </div>
            </div>

            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Ürün</th>
                  <th>Adet</th>
                  <th>Birim Fiyat</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price_each}₺</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="invoice-actions">
              <button 
                className="view-invoice-btn"
                onClick={() => handleViewInvoice(invoice.delivery_id)}
              >
                Faturayı Görüntüle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceManagementPage;
