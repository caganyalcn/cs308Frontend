import React, { useState } from "react";
import "../styles/InvoiceManagementPage.css";

const InvoiceManagementPage = () => {
  const [invoices] = useState([
    {
      id: "INV-001",
      customer: "C-001",
      date: "2025-05-10",
      total: 128.5,
      items: [
        { name: "Yoğurt", quantity: 2, price: 15 },
        { name: "Peynir", quantity: 1, price: 35 },
        { name: "Makarna", quantity: 3, price: 10.5 },
      ],
    },
    {
      id: "INV-002",
      customer: "C-002",
      date: "2025-05-13",
      total: 65.0,
      items: [
        { name: "Süt", quantity: 2, price: 12.5 },
        { name: "Yumurta", quantity: 1, price: 40 },
      ],
    },
  ]);

  return (
    <div className="invoice-page">
      <h2 className="invoice-title">Fatura Listesi</h2>

      <div className="invoice-grid">
        {invoices.map((inv) => (
          <div key={inv.id} className="invoice-card">
            <div className="invoice-header">
              <div className="invoice-meta">
                <p className="invoice-id">Fatura No: {inv.id}</p>
                <p className="invoice-customer">Müşteri: {inv.customer}</p>
                <p className="invoice-date">Tarih: {inv.date}</p>
              </div>
              <div className="invoice-total">
                Toplam: {inv.total}₺
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
                {inv.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}₺</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceManagementPage;
