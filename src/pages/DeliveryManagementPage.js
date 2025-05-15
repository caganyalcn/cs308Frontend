import React, { useState } from "react";


const STATUS_OPTIONS = ["processing", "in-transit", "delivered"];

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
    },
    {
      id: 102,
      customer: "C-002",
      product: "P-005",
      quantity: 1,
      total: 45.0,
      address: "Kadıköy, İstanbul",
      status: "in-transit",
    },
    {
      id: 103,
      customer: "C-003",
      product: "P-022",
      quantity: 4,
      total: 120.0,
      address: "Bornova, İzmir",
      status: "delivered",
    },
  ]);


 
  const updateStatus = (id, newStatus) => {
    const updated = deliveries.map((d) =>
      d.id === id ? { ...d, status: newStatus } : d
    );
    setDeliveries(updated);

    // TODO: backend çağrısı
    // fetch(`/api/deliveries/${id}/`, { method:"PUT", body: JSON.stringify({status:newStatus}) })
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Teslimat Yönetimi
      </h2>

      <div className="overflow-x-auto shadow border rounded-lg bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 border-b">ID</th>
              <th className="px-4 py-3 border-b">Müşteri</th>
              <th className="px-4 py-3 border-b">Ürün</th>
              <th className="px-4 py-3 border-b">Adet</th>
              <th className="px-4 py-3 border-b">Tutar</th>
              <th className="px-4 py-3 border-b">Adres</th>
              <th className="px-4 py-3 border-b text-center">Durum</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-b">{d.id}</td>
                <td className="px-4 py-3 border-b">{d.customer}</td>
                <td className="px-4 py-3 border-b">{d.product}</td>
                <td className="px-4 py-3 border-b">{d.quantity}</td>
                <td className="px-4 py-3 border-b">{d.total}₺</td>
                <td className="px-4 py-3 border-b">{d.address}</td>
                <td className="px-4 py-3 border-b text-center">
                  <select
                    value={d.status}
                    onChange={(e) => updateStatus(d.id, e.target.value)}
                    className="border px-2 py-1 rounded"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
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
  );
};

export default DeliveryManagementPage;
