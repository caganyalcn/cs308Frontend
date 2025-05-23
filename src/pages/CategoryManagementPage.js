import React, { useState, useEffect } from "react";
import "../styles/CategoryManagementPage.css";

const API = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

const CategoryManagementPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
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
        setError(null);
      } else {
        console.error('API response for categories is not an array:', data);
        setError('Kategoriler beklenmedik formatta geldi.');
      }
    } catch (err) {
      setError('Kategoriler yüklenirken bir hata oluştu.');
      console.error('Kategoriler alınamadı:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addCategory = async () => {
    if (!newCat.trim()) return;
    
    try {
      const response = await fetch(`${API}/api/products/categories/create/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ name: newCat.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Kategori eklenemedi');
      }

      await fetchCategories();
      setNewCat("");
      setError(null);
    } catch (err) {
      setError('Kategori eklenirken bir hata oluştu: ' + err.message);
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) return;

    try {
      const response = await fetch(`${API}/api/products/categories/${id}/delete/`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8'
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Kategori silinemedi');
      }

      await fetchCategories();
      setError(null);
    } catch (err) {
      setError('Kategori silinirken bir hata oluştu: ' + err.message);
    }
  };

  const updateCategory = async (id, name) => {
    try {
      const response = await fetch(`${API}/api/products/categories/${id}/update/`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ name: name.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Kategori güncellenemedi');
      }

      await fetchCategories();
      setError(null);
    } catch (err) {
      setError('Kategori güncellenirken bir hata oluştu: ' + err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Kategori Yönetimi
        </h2>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Kategori Yönetimi
      </h2>

      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Liste */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {categories.map((cat) => (
          <CategoryRow
            key={cat.id}
            cat={cat}
            onDelete={() => deleteCategory(cat.id)}
            onSave={(name) => updateCategory(cat.id, name)}
          />
        ))}
      </div>

      {/* Yeni kategori ekle */}
      <div className="mt-8 flex gap-4">
        <input
          type="text"
          placeholder="Yeni kategori adı"
          className="flex-1 p-2 border rounded"
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
        />
        <button
          onClick={addCategory}
          className="bg-green-600 text-white px-6 rounded hover:bg-green-700"
        >
          Ekle
        </button>
      </div>
    </div>
  );
};

const CategoryRow = ({ cat, onDelete, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(cat.name);

  const handleSave = () => {
    onSave(editedName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(cat.name);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b last:border-b-0">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="flex-1 p-2 border rounded mr-2"
          />
          <div className="flex gap-1">
            <button
              onClick={handleSave}
              className="bg-gray-200 border border-gray-300 text-gray-800 px-2 py-0.5 rounded hover:bg-gray-300 transition-colors duration-200 text-sm"
            >
              Kaydet
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-200 border border-gray-300 text-gray-800 px-2 py-0.5 rounded hover:bg-gray-300 transition-colors duration-200 text-sm"
            >
              İptal
            </button>
          </div>
        </>
      ) : (
        <>
          <span className="text-gray-800 flex-1">{cat.name}</span>
          <div className="flex gap-1 flex-none ml-auto">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gray-200 border border-gray-300 text-gray-800 px-2 py-0.5 rounded hover:bg-gray-300 transition-colors duration-200 text-sm"
            >
              Düzenle
            </button>
            <button
              onClick={onDelete}
              className="bg-gray-200 border border-gray-300 text-gray-800 px-2 py-0.5 rounded hover:bg-gray-300 transition-colors duration-200 text-sm"
            >
              Sil
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryManagementPage;
