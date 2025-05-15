import React, { useState } from "react";

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
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Fatura Listesi
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {invoices.map((inv) => (
          <div
            key={inv.id}
            className="bg-white border rounded-lg shadow p-6 space-y-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <div>
                <p className="text-lg font-semibold">Fatura No: {inv.id}</p>
                <p className="text-gray-600">Müşteri: {inv.customer}</p>
                <p className="text-gray-500 text-sm">Tarih: {inv.date}</p>
              </div>
              <div className="text-right font-bold text-green-600 text-lg">
                Toplam: {inv.total}₺
              </div>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="text-left p-2 border-b">Ürün</th>
                  <th className="text-center p-2 border-b">Adet</th>
                  <th className="text-right p-2 border-b">Birim Fiyat</th>
                </tr>
              </thead>
              <tbody>
                {inv.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-2 border-b">{item.name}</td>
                    <td className="text-center p-2 border-b">{item.quantity}</td>
                    <td className="text-right p-2 border-b">{item.price}₺</td>
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
