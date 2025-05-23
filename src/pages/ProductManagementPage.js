import React, { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import "../styles/ProductManagementPage.css"

const API = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', stock_quantity: '', description: '', category: '', serial_number: '', distributor_info: '', image_url: '' });
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({ name: '', stock_quantity: '', description: '', category: '', serial_number: '', distributor_info: '', image_url: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API}/api/products/categories/`, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
      if (!response.ok) throw new Error('Kategoriler yüklenemedi');
      const data = await response.json();
      if (Array.isArray(data.categories)) {
        setCategories(data.categories);
      } else {
        console.error('API response for categories is not an array:', data);
        setError('Kategoriler beklenmedik formatta geldi.');
      }
    } catch (err) {
      console.error('Kategoriler alınamadı:', err);
      setError('Kategoriler yüklenirken bir hata oluştu.');
    }
  };

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/api/products/products/`, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
      if (!response.ok) {
        console.error('Failed to fetch products:', response.status);
        setError('Ürünler yüklenemedi.');
        setProducts([]);
        return;
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setProducts(data);
        setError(null);
      } else {
        console.error('API response for products is not an array:', data);
        setError('Ürünler beklenmedik formatta geldi.');
        setProducts([]);
      }
    } catch (err) {
      setError('Ürünler yüklenirken bir hata oluştu.');
      console.error('Error fetching products:', err);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch(`${API}/api/products/products/create/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(newProduct),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        if (typeof errorData === 'object' && errorData !== null) {
          const errorMessage = errorData.error || (errorData.detail ? errorData.detail : JSON.stringify(errorData));
          throw new Error(errorMessage || 'Ürün eklenemedi');
        } else {
          throw new Error(errorData || 'Ürün eklenemedi');
        }
      }
      
      const data = await response.json();
      await fetchProducts();
      setNewProduct({ name: '', stock_quantity: '', description: '', category: '', serial_number: '', distributor_info: '', image_url: '' });
      setError(null);
    } catch (err) {
      setError('Ürün eklenirken bir hata oluştu: ' + err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;

    try {
      const response = await fetch(`${API}/api/products/products/${id}/delete/`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Silme işlemi başarısız');
      }
      
      await fetchProducts();
      setError(null);
    } catch (err) {
      setError('Ürün silinirken bir hata oluştu: ' + err.message);
    }
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditedProduct({
      name: product.name,
      stock_quantity: product.stock_quantity,
      description: product.description || '',
      category: product.category || '',
      serial_number: product.serial_number || '',
      distributor_info: product.distributor_info || '',
      image_url: product.image_url || ''
    });
  };

  const handleSaveEdit = async (id) => {
    try {
      const response = await fetch(`${API}/api/products/products/${id}/update/`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(editedProduct),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Güncelleme başarısız');
      }
      
      await fetchProducts();
      setEditingId(null);
      setEditedProduct({ name: '', stock_quantity: '', description: '', category: '', serial_number: '', distributor_info: '', image_url: '' });
      setError(null);
    } catch (err) {
      setError('Ürün güncellenirken bir hata oluştu: ' + err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedProduct({ name: '', stock_quantity: '', description: '', category: '', serial_number: '', distributor_info: '', image_url: '' });
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
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
                          min="0"
                          value={editedProduct.stock_quantity}
                          onChange={(e) => setEditedProduct({ ...editedProduct, stock_quantity: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <span className="text-sm text-gray-900">{prod.stock_quantity}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === prod.id ? (
                        <select
                          value={editedProduct.category}
                          onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Kategori Seçin</option>
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-sm text-gray-900">
                          {categories.find(cat => cat.id === prod.category)?.name || 'Kategorisiz'}
                        </span>
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
                min="0"
                value={newProduct.stock_quantity}
                onChange={(e) => setNewProduct({ ...newProduct, stock_quantity: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Kategori Seçin</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Seri Numarası"
                value={newProduct.serial_number}
                onChange={(e) => setNewProduct({ ...newProduct, serial_number: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Distribütör Bilgisi"
                value={newProduct.distributor_info}
                onChange={(e) => setNewProduct({ ...newProduct, distributor_info: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Resim URL'si"
                value={newProduct.image_url}
                onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                placeholder="Ürün açıklaması"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-3"
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
