import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBox, FaTags, FaTruck, FaFileInvoice, FaComments } from "react-icons/fa";

const ProductManagerPage = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Ürünleri Yönet",
      icon: <FaBox size={42} />,
      path: "/product-manager/products",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Kategorileri Yönet",
      icon: <FaTags size={42} />,
      path: "/product-manager/categories",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Teslimatları Yönet",
      icon: <FaTruck size={42} />,
      path: "/product-manager/deliveries",
      color: "from-teal-500 to-teal-600",
    },
    {
      title: "Faturaları Görüntüle",
      icon: <FaFileInvoice size={42} />,
      path: "/product-manager/invoices",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Yorumları Yönet",
      icon: <FaComments size={42} />,
      path: "/product-manager/comments",
      color: "from-pink-500 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-14 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Başlık */}
        <header className="text-center mb-14 px-4">
          <h1 className="text-4xl font-extrabold text-gray-800 sm:text-5xl">
            Ürün Yönetimi
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-lg text-gray-600">
            Tüm yönetim işlemlerinizi buradan gerçekleştirebilirsiniz
          </p>
        </header>

        {/* Ortalanmış Grid */}
        <div className="grid gap-8 justify-items-center sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map(({ title, icon, path, color }) => (
            <button
              key={title}
              onClick={() => navigate(path)}
              className={`w-60 h-48 bg-gradient-to-br ${color} text-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center transform transition hover:-translate-y-1 hover:shadow-2xl focus:outline-none`}
            >
              <span className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-10 bg-white transition" />
              {icon}
              <span className="mt-4 text-lg font-semibold text-center">{title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductManagerPage;
