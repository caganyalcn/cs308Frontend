import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBox, FaTags, FaTruck, FaFileInvoice, FaComments } from "react-icons/fa";

const ProductManagerPage = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Ürünleri Yönet",
      icon: <FaBox className="text-4xl mb-4" />,
      path: "/product-manager/products",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700"
    },
    {
      title: "Kategorileri Yönet",
      icon: <FaTags className="text-4xl mb-4" />,
      path: "/product-manager/categories",
      color: "bg-indigo-600",
      hoverColor: "hover:bg-indigo-700"
    },
    {
      title: "Teslimatları Yönet",
      icon: <FaTruck className="text-4xl mb-4" />,
      path: "/product-manager/deliveries",
      color: "bg-teal-600",
      hoverColor: "hover:bg-teal-700"
    },
    {
      title: "Faturaları Görüntüle",
      icon: <FaFileInvoice className="text-4xl mb-4" />,
      path: "/product-manager/invoices",
      color: "bg-purple-600",
      hoverColor: "hover:bg-purple-700"
    },
    {
      title: "Yorumları Yönet",
      icon: <FaComments className="text-4xl mb-4" />,
      path: "/product-manager/comments",
      color: "bg-pink-600",
      hoverColor: "hover:bg-pink-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Ürün Yönetimi
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Tüm ürün yönetimi işlemlerinizi buradan gerçekleştirebilirsiniz
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`${item.color} ${item.hoverColor} text-white rounded-xl shadow-lg p-8 transform transition-all duration-200 hover:scale-105 flex flex-col items-center justify-center`}
            >
              {item.icon}
              <span className="text-xl font-semibold">{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductManagerPage;