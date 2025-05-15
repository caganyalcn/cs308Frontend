import React from "react";
import { useNavigate } from "react-router-dom";

const ProductManagerPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Product Manager Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Ürünler */}
        <button
          onClick={() => navigate("/product-manager/products")}
          className="bg-blue-600 text-white py-6 rounded-lg shadow hover:bg-blue-700"
        >
          Ürünleri Yönet
        </button>

        {/* Kategoriler */}
        <button
          onClick={() => navigate("/product-manager/categories")}
          className="bg-indigo-600 text-white py-6 rounded-lg shadow hover:bg-indigo-700"
        >
          Kategorileri Yönet
        </button>

        {/* Teslimatlar */}
        <button
          onClick={() => navigate("/product-manager/deliveries")}
          className="bg-teal-600 text-white py-6 rounded-lg shadow hover:bg-teal-700 md:col-span-2"
        >
          Teslimatları Yönet
        </button>
        <button
     onClick={() => navigate("/product-manager/invoices")}
     className="bg-purple-600 text-white py-6 rounded-lg shadow hover:bg-purple-700 md:col-span-2"
   >
  Faturaları Görüntüle
 </button>
 <button
    onClick={() => navigate("/product-manager/comments")}
    className="bg-pink-600 text-white py-6 rounded-lg shadow hover:bg-pink-700 md:col-span-2"
  >
    Yorumları Yönet
  </button>
      </div>
    </div>
  );
};

export default ProductManagerPage;
