import React, { useState } from "react";
import { FaTruck, FaBox, FaUser, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";

const STATUS_OPTIONS = [
  { value: "processing", label: "İşleniyor", color: "bg-yellow-100 text-yellow-800" },
  { value: "in-transit", label: "Yolda", color: "bg-blue-100 text-blue-800" },
  { value: "delivered", label: "Teslim Edildi", color: "bg-green-100 text-green-800" }
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

    // TODO: backend çağrısı
    // fetch(`/api/deliveries/${id}/`, { method:"PUT", body: JSON.stringify({status:newStatus}) })
  };

  const getStatusBadge = (status) => {
    const statusOption = STATUS_OPTIONS.find(option => option.value === status);
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusOption.color}`}>
        {statusOption.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Teslimat Yönetimi
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Tüm teslimatları görüntüleyin ve durumlarını güncelleyin
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800">Teslimat Listesi</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <FaBox className="w-4 h-4" />
                      <span>ID</span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <FaUser className="w-4 h-4" />
                      <span>Müşteri</span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <FaBox className="w-4 h-4" />
                      <span>Ürün</span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <FaBox className="w-4 h-4" />
                      <span>Adet</span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <FaMoneyBillWave className="w-4 h-4" />
                      <span>Tutar</span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="w-4 h-4" />
                      <span>Adres</span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <FaTruck className="w-4 h-4" />
                      <span>Durum</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {deliveries.map((delivery) => (
                  <tr key={delivery.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      #{delivery.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {delivery.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {delivery.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {delivery.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {delivery.total}₺
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {delivery.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={delivery.status}
                        onChange={(e) => updateStatus(delivery.id, e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
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
    </div>
  );
};

export default DeliveryManagementPage;