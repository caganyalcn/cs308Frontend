import React, { useState } from "react";
import { FaTruck, FaBox, FaUser, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import "../styles/DeliveryManagementPage.css";

const STATUS_OPTIONS = [
  { value: "processing", label: "İşleniyor" },
  { value: "in-transit", label: "Yolda" },
  { value: "delivered", label: "Teslim Edildi" }
];

const DeliveryManagementPage = () => {
  const [deliveries, setDeliveries] = useState([
    {
      id: 101,
      customer: "C-001",
      product: "P-010",
      quantity: 2,
      total: 78.0,
      address: "Sabanci Üniv., Tuzla / İstanbul",
      status: "processing",
      date: "2024-03-15"
    },
    {
      id: 102,
      customer: "C-002",
      product: "P-005",
      quantity: 1,
      total: 45.0,
      address: "Kadıköy, İstanbul",
      status: "in-transit",
      date: "2024-03-14"
    },
    {
      id: 103,
      customer: "C-003",
      product: "P-022",
      quantity: 4,
      total: 120.0,
      address: "Bornova, İzmir",
      status: "delivered",
      date: "2024-03-13"
    },
  ]);

  const updateStatus = (id, newStatus) => {
    const updated = deliveries.map((d) =>
      d.id === id ? { ...d, status: newStatus } : d
    );
    setDeliveries(updated);
  };

  return (
    <div className="delivery-container">
      <div className="delivery-header">
        <h1 className="delivery-title">Teslimat Yönetimi</h1>
        <p className="delivery-subtitle">
          Tüm teslimatları görüntüleyin ve durumlarını güncelleyin
        </p>
      </div>

      <div className="delivery-card">
        <h2 className="delivery-list-title">Teslimat Listesi</h2>

        <div className="delivery-table-wrapper">
          <table className="delivery-table">
            <thead>
              <tr>
                <th><FaBox /> ID</th>
                <th><FaUser /> Müşteri</th>
                <th><FaBox /> Ürün</th>
                <th><FaBox /> Adet</th>
                <th><FaMoneyBillWave /> Tutar</th>
                <th><FaMapMarkerAlt /> Adres</th>
                <th><FaTruck /> Durum</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((delivery) => (
                <tr key={delivery.id}>
                  <td>#{delivery.id}</td>
                  <td>{delivery.customer}</td>
                  <td>{delivery.product}</td>
                  <td>{delivery.quantity}</td>
                  <td>{delivery.total}₺</td>
                  <td>{delivery.address}</td>
                  <td>
                    <select
                      value={delivery.status}
                      onChange={(e) => updateStatus(delivery.id, e.target.value)}
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
