import React, { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', stock: '', price: '' });
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({ name: '', stock: '', price: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/products/products/');
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Ürünler yüklenirken bir hata oluştu.');
      console.error('Ürünler alınamadı:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch('/api/products/products/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      
      if (!response.ok) throw new Error('Ürün eklenemedi');
      
      const data = await response.json();
      setProducts([...products, data]);
      setNewProduct({ name: '', stock: '', price: '' });
      setError(null);
    } catch (err) {
      setError('Ürün eklenirken bir hata oluştu.');
      alert('Hata: ' + err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;

    try {
      const response = await fetch(`/api/products/products/${id}/`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Silme işlemi başarısız');
      
      setProducts(products.filter((p) => p.id !== id));
      setError(null);
    } catch (err) {
      setError('Ürün silinirken bir hata oluştu.');
      alert('Silinemedi: ' + err.message);
    }
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditedProduct({
      name: product.name,
      stock: product.stock_quantity || product.stock,
      price: product.price,
    });
  };

  const handleSaveEdit = async (id) => {
    try {
      const response = await fetch(`/api/products/products/${id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedProduct),
      });
      
      if (!response.ok) throw new Error('Güncelleme başarısız');
      
      const data = await response.json();
      const updatedList = products.map((p) => (p.id === id ? data : p));
      setProducts(updatedList);
      setEditingId(null);
      setEditedProduct({ name: '', stock: '', price: '' });
      setError(null);
    } catch (err) {
      setError('Ürün güncellenirken bir hata oluştu.');
      alert('Kaydedilemedi: ' + err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedProduct({ name: '', stock: '', price: '' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Ürün Yönetimi
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Ürünlerinizi ekleyin, düzenleyin ve yönetin
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800">Ürün Listesi</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İsim</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fiyat</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{prod.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === prod.id ? (
                        <input
                          type="text"
                          value={editedProduct.name}
                          onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <span className="text-sm text-gray-900">{prod.name}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === prod.id ? (
                        <input
                          type="number"
                          value={editedProduct.stock}
                          onChange={(e) => setEditedProduct({ ...editedProduct, stock: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <span className="text-sm text-gray-900">{prod.stock_quantity || prod.stock}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === prod.id ? (
                        <input
                          type="number"
                          value={editedProduct.price}
                          onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <span className="text-sm text-gray-900">{`${prod.price}₺`}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      {editingId === prod.id ? (
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleSaveEdit(prod.id)}
                            className="text-green-600 hover:text-green-900 transition-colors duration-200"
                          >
                            <FaSave className="w-5 h-5" />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                          >
                            <FaTimes className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleEditClick(prod)}
                            className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                          >
                            <FaEdit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="text-red-600 hover:text-red-900 transition-colors duration-200"
                          >
                            <FaTrash className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800">Yeni Ürün Ekle</h2>
          </div>
          <div className="p-6">
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
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="number"
                placeholder="Stok"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="number"
                placeholder="Fiyat"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="md:col-span-3 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <FaPlus className="w-5 h-5" />
                <span>Ürün Ekle</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagementPage;