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
      });
      if (!response.ok) throw new Error('Kategoriler yüklenemedi');
      const data = await response.json();
      setCategories(data.categories);
      setError(null);
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
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: newCat.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Kategori eklenemedi');
      }

      const data = await response.json();
      setCategories([...categories, data]);
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
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Kategori silinemedi');

      setCategories(categories.filter((c) => c.id !== id));
      setError(null);
    } catch (err) {
      setError('Kategori silinirken bir hata oluştu: ' + err.message);
    }
  };

  const updateCategory = async (id, name) => {
    try {
      const response = await fetch(`${API}/api/products/categories/${id}/update/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: name.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Kategori güncellenemedi');
      }

      const data = await response.json();
      setCategories(categories.map((c) => (c.id === id ? data : c)));
      setError(null);
    } catch (err) {
      setError('Kategori güncellenirken bir hata oluştu: ' + err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(cat.name);

  return (
    <div className="category-row">
      {editing ? (
        <>
          <input
            className="flex-1 p-1 border rounded mr-4"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
          />
          <div className="button-group">
            <button
              onClick={() => {
                onSave(tempName.trim() || cat.name);
                setEditing(false);
              }}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Kaydet
            </button>
            <button
              onClick={() => {
                setTempName(cat.name);
                setEditing(false);
              }}
              className="bg-gray-400 text-white px-3 py-1 rounded"
            >
              İptal
            </button>
          </div>
        </>
      ) : (
        <>
          <span className="category-name">{cat.name}</span>
          <div className="button-group">
            <button
              onClick={() => setEditing(true)}
              className="bg-yellow-400 px-3 py-1 rounded"
            >
              Düzenle
            </button>
            <button
              onClick={onDelete}
              className="bg-red-500 text-white px-3 py-1 rounded"
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
