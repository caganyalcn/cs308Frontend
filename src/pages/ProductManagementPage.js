// src/pages/ProductManagementPage.js
import React, { useEffect, useState } from 'react';

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // API'den ürünleri çek (endpoint backend'e göre değiştirilmeli)
    fetch('/api/products/')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Ürünler alınamadı:', err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Ürün Listesi</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">İsim</th>
            <th className="border px-4 py-2">Stok</th>
            <th className="border px-4 py-2">Fiyat</th>
            <th className="border px-4 py-2">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td className="border px-4 py-2">{prod.id}</td>
              <td className="border px-4 py-2">{prod.name}</td>
              <td className="border px-4 py-2">{prod.stock}</td>
              <td className="border px-4 py-2">{prod.price}₺</td>
              <td className="border px-4 py-2">
                <button className="mr-2 bg-yellow-400 px-2 py-1 rounded">Düzenle</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagementPage;
