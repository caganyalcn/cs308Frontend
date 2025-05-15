import React, { useState } from "react";

const CategoryManagementPage = () => {
  const [categories, setCategories] = useState([
    // Mock başlangıç verisi
    { id: 1, name: "Süt Ürünleri" },
    { id: 2, name: "Sebzeler" },
    { id: 3, name: "Meyveler" },
  ]);

  const [newCat, setNewCat] = useState("");

  const addCategory = () => {
    if (!newCat.trim()) return;
    const nextId = categories.length ? categories[categories.length - 1].id + 1 : 1;
    setCategories([...categories, { id: nextId, name: newCat }]);
    setNewCat("");
  };

  const deleteCategory = (id) =>
    setCategories(categories.filter((c) => c.id !== id));

  const updateCategory = (id, name) =>
    setCategories(
      categories.map((c) => (c.id === id ? { ...c, name } : c))
    );

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Kategori Yönetimi
      </h2>

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
    <div className="flex items-center justify-between px-6 py-3 border-b">
      {editing ? (
        <>
          <input
            className="flex-1 p-1 border rounded mr-4"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
          />
          <button
            onClick={() => {
              onSave(tempName.trim() || cat.name);
              setEditing(false);
            }}
            className="bg-green-500 text-white px-3 py-1 rounded mr-2"
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
        </>
      ) : (
        <>
          <span className="flex-1">{cat.name}</span>
          <button
            onClick={() => setEditing(true)}
            className="bg-yellow-400 text-white px-3 py-1 rounded mr-2"
          >
            Düzenle
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Sil
          </button>
        </>
      )}
    </div>
  );
};

export default CategoryManagementPage;
