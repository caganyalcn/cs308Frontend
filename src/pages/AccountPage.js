// Updated React AccountPage with editable fields and backend integration
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import OrdersPage from "./OrdersPage";
import "../styles/AccountPage.css";
import { AppContext } from "../AppContext";

const AccountPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState({ name: false, email: false, phone: false });
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [activeTab, setActiveTab] = useState("profile");
  const { logout } = useContext(AppContext);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/accounts/me/", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setFormData({ name: data.name, email: data.email, phone: data.phone || "" });
      })
      .catch((err) => console.error("Kullanıcı verileri alınamadı", err));
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    fetch("http://127.0.0.1:8000/api/accounts/update/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setEditMode({ name: false, email: false, phone: false });
      })
      .catch((err) => console.error("Güncelleme hatası", err));
  };

  const gotoFavorites = () => navigate("/favorites");
  const gotoPaymentPage = () => navigate("/payment-methods");

  if (!user) return <div><Header /><p>Yükleniyor...</p></div>;

  return (
    <div className="account-page">
      <Header />
      <div className="account-container">
        <div className="account-sidebar">
          <div className="profile-summary">
            <img src={"https://via.placeholder.com/150"} alt={user.name} className="profile-picture" />
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          <div className="sidebar-menu">
            <button className={`menu-item ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab("profile")}> <i className="fa fa-user" /> Profil Bilgilerim</button>
            <button className={`menu-item ${activeTab === "orders" ? "active" : ""}`} onClick={() => setActiveTab("orders")}> <i className="fa fa-shopping-bag" /> Siparişlerim</button>
            <button className="menu-item" onClick={gotoFavorites}><i className="fa fa-heart" /> Favorilerim</button>
            <button className="menu-item" onClick={() => navigate("/addresses")}><i className="fa fa-map-marker" /> Adreslerim</button>
            <button className="menu-item" onClick={gotoPaymentPage}><i className="fa fa-credit-card" /> Ödeme Yöntemlerim</button>
            <button className="menu-item" onClick={logout} style={{ backgroundColor: "#dc3545", color: "white" }}><i className="fa fa-sign-out" /> Çıkış Yap</button>
          </div>
        </div>

        <div className="account-content">
          {activeTab === "profile" && (
            <div className="profile-details">
              <h2>Kışisel Bilgilerim</h2>
              <div className="edit-profile-form">
                {['name', 'email', 'phone'].map((field) => (
                  <div className="form-group" key={field}>
                    <label>{field === 'name' ? 'Ad Soyad' : field === 'email' ? 'E-Posta Adresi' : 'Telefon Numarası'}</label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      value={formData[field]}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      readOnly={!editMode[field]}
                    />
                    <button className="edit-button" onClick={() => setEditMode((prev) => ({ ...prev, [field]: !prev[field] }))}>
                      {editMode[field] ? "İptal" : "Düzenle"}
                    </button>
                  </div>
                ))}
                <button className="save-button" onClick={handleSave}>Değişiklikleri Kaydet</button>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="orders-section orders-wrapper">
              <OrdersPage isEmbedded />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
