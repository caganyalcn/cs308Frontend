import React, { useEffect, useState } from 'react';

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', stock: '', price: '' });
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({ name: '', stock: '', price: '' });

  useEffect(() => {
    fetch('/api/products/products/')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Ürünler alınamadı:', err));
  }, []);

  const handleAddProduct = () => {
    fetch('/api/products/products/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Ürün eklenemedi');
        return res.json();
      })
      .then((data) => {
        setProducts([...products, data]);
        setNewProduct({ name: '', stock: '', price: '' });
      })
      .catch((err) => alert('Hata: ' + err.message));
  };

  const handleDeleteProduct = (id) => {
    if (!window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;

    fetch(`/api/products/products/${id}/`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Silme işlemi başarısız');
        setProducts(products.filter((p) => p.id !== id));
      })
      .catch((err) => alert('Silinemedi: ' + err.message));
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditedProduct({
      name: product.name,
      stock: product.stock_quantity || product.stock,
      price: product.price,
    });
  };

  const handleSaveEdit = (id) => {
    fetch(`/api/products/products/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedProduct),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Güncelleme başarısız');
        return res.json();
      })
      .then((data) => {
        const updatedList = products.map((p) => (p.id === id ? data : p));
        setProducts(updatedList);
        setEditingId(null);
        setEditedProduct({ name: '', stock: '', price: '' });
      })
      .catch((err) => alert('Kaydedilemedi: ' + err.message));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedProduct({ name: '', stock: '', price: '' });
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Ürün Yönetimi</h2>

      <div className="overflow-x-auto shadow border rounded-lg">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 border-b">ID</th>
              <th className="px-6 py-3 border-b">İsim</th>
              <th className="px-6 py-3 border-b">Stok</th>
              <th className="px-6 py-3 border-b">Fiyat</th>
              <th className="px-6 py-3 border-b text-center">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{prod.id}</td>
                <td className="px-6 py-4 border-b">
                  {editingId === prod.id ? (
                    <input
                      type="text"
                      value={editedProduct.name}
                      onChange={(e) =>
                        setEditedProduct({ ...editedProduct, name: e.target.value })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    prod.name
                  )}
                </td>
                <td className="px-6 py-4 border-b">
                  {editingId === prod.id ? (
                    <input
                      type="number"
                      value={editedProduct.stock}
                      onChange={(e) =>
                        setEditedProduct({ ...editedProduct, stock: e.target.value })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    prod.stock_quantity || prod.stock
                  )}
                </td>
                <td className="px-6 py-4 border-b">
                  {editingId === prod.id ? (
                    <input
                      type="number"
                      value={editedProduct.price}
                      onChange={(e) =>
                        setEditedProduct({ ...editedProduct, price: e.target.value })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    `${prod.price}₺`
                  )}
                </td>
                <td className="px-6 py-4 border-b text-center space-x-2">
                  {editingId === prod.id ? (
                    <>
                      <button
                        onClick={() => handleSaveEdit(prod.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Kaydet
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      >
                        İptal
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(prod)}
                        className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                      >
                        Düzenle
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Sil
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Yeni Ürün Formu */}
      <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Yeni Ürün Ekle</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddProduct();
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            type="text"
            placeholder="Ürün adı"
            className="p-2 border rounded"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Stok"
            className="p-2 border rounded"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Fiyat"
            className="p-2 border rounded"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 col-span-1 md:col-span-3"
          >
            Ürün Ekle
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductManagementPage;
