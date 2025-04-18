import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/AddressesPage.css";

const AddressesPage = ({ isEmbedded = false }) => {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      title: "Ev Adresi",
      fullName: "Ahmet Yılmaz",
      phone: "5551234567",
      city: "İstanbul",
      district: "Kadıköy",
      neighborhood: "Moda",
      address: "Moda Caddesi No:123",
      apartment: "Daire 4",
      isDefault: true
    }
  ]);

  const [newAddress, setNewAddress] = useState({
    title: "",
    fullName: "",
    phone: "",
    city: "",
    district: "",
    neighborhood: "",
    address: "",
    apartment: "",
    isDefault: false
  });

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (editingAddress) {
      setEditingAddress({
        ...editingAddress,
        [name]: type === 'checkbox' ? checked : value
      });
    } else {
      setNewAddress(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAddress) {
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id ? editingAddress : addr
      ));
      setEditingAddress(null);
    } else {
      const newId = Math.max(...addresses.map(a => a.id), 0) + 1;
      setAddresses([...addresses, { ...newAddress, id: newId }]);
      setNewAddress({
        title: "",
        fullName: "",
        phone: "",
        city: "",
        district: "",
        neighborhood: "",
        address: "",
        apartment: "",
        isDefault: false
      });
      setIsAddingNew(false);
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setIsAddingNew(false);
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter(address => address.id !== id));
  };

  const handleSetDefault = (id) => {
    setAddresses(addresses.map(address => ({
      ...address,
      isDefault: address.id === id
    })));
  };

  const renderAddressForm = (data, isEditing = false) => (
    <form className="new-address-form" onSubmit={handleSubmit}>
      <h3>{isEditing ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}</h3>
      <div className="form-group">
        <label>Adres Başlığı</label>
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Ad Soyad</label>
        <input
          type="text"
          name="fullName"
          value={data.fullName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Telefon</label>
        <input
          type="tel"
          name="phone"
          value={data.phone}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Şehir</label>
        <input
          type="text"
          name="city"
          value={data.city}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>İlçe</label>
        <input
          type="text"
          name="district"
          value={data.district}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Mahalle</label>
        <input
          type="text"
          name="neighborhood"
          value={data.neighborhood}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Adres</label>
        <textarea
          name="address"
          value={data.address}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Daire No</label>
        <input
          type="text"
          name="apartment"
          value={data.apartment}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group checkbox">
        <label>
          <input
            type="checkbox"
            name="isDefault"
            checked={data.isDefault}
            onChange={handleInputChange}
          />
          Varsayılan Adres Olarak Kaydet
        </label>
      </div>
      <div className="form-actions">
        <button type="submit" className="save-btn">
          {isEditing ? 'Güncelle' : 'Kaydet'}
        </button>
        <button 
          type="button" 
          className="cancel-btn"
          onClick={() => {
            if (isEditing) {
              setEditingAddress(null);
            } else {
              setIsAddingNew(false);
            }
          }}
        >
          İptal
        </button>
      </div>
    </form>
  );

  return (
    <div className={isEmbedded ? "embedded-addresses" : "addresses-page"}>
      {!isEmbedded && (
        <>
          <Header />
          <div className="page-header">
            <button className="back-button" onClick={() => navigate(-1)}>
              <i className="fa fa-arrow-left"></i> Geri Dön
            </button>
            <h2 className="addresses-title">Adreslerim</h2>
          </div>
        </>
      )}
      {isEmbedded && <h2 className="addresses-title">Adreslerim</h2>}

      <div className="addresses-container">
        {addresses.map(address => (
          <div key={address.id} className="address-card">
            <div className="address-header">
              <h3>{address.title}</h3>
              {address.isDefault && <span className="default-badge">Varsayılan</span>}
            </div>
            <div className="address-details">
              <p><strong>Ad Soyad:</strong> {address.fullName}</p>
              <p><strong>Telefon:</strong> {address.phone}</p>
              <p><strong>Adres:</strong> {address.address}</p>
              <p><strong>Daire:</strong> {address.apartment}</p>
              <p><strong>Mahalle:</strong> {address.neighborhood}</p>
              <p><strong>İlçe:</strong> {address.district}</p>
              <p><strong>Şehir:</strong> {address.city}</p>
            </div>
            <div className="address-actions">
              {!address.isDefault && (
                <button 
                  className="set-default-btn"
                  onClick={() => handleSetDefault(address.id)}
                >
                  Varsayılan Yap
                </button>
              )}
              <button 
                className="edit-btn"
                onClick={() => handleEdit(address)}
              >
                Düzenle
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(address.id)}
              >
                Sil
              </button>
            </div>
          </div>
        ))}

        {!isAddingNew && !editingAddress && (
          <button 
            className="add-address-btn"
            onClick={() => setIsAddingNew(true)}
          >
            Yeni Adres Ekle
          </button>
        )}

        {isAddingNew && renderAddressForm(newAddress)}
        {editingAddress && renderAddressForm(editingAddress, true)}
      </div>
    </div>
  );
};

export default AddressesPage; 