// src/pages/AccountPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import OrdersPage from "./OrdersPage";
import "../styles/AccountPage.css";

const AccountPage = () => {
  const navigate = useNavigate();

  /* —— kullanıcı mock ——————————— */
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    profilePicture: "https://via.placeholder.com/150",
    password: "••••••••",
  };

  /* —— sekme kontrolü ——————————— */
  const [activeTab, setActiveTab] = useState("profile");

  /* —— yönlendirme kısayolları —— */
  const gotoFavorites   = () => navigate("/favorites");
  const gotoPaymentPage = () => navigate("/payment-methods");

  return (
    <div className="account-page">
      <Header />

      <div className="account-container">
        {/* SOL SİDEBAR */}
        <div className="account-sidebar">
          <div className="profile-summary">
            <img src={user.profilePicture} alt={user.name} className="profile-picture" />
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>

          <div className="sidebar-menu">
            <button
              className={`menu-item ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <i className="fa fa-user" /> Profil Bilgilerim
            </button>

            <button
              className={`menu-item ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <i className="fa fa-shopping-bag" /> Siparişlerim
            </button>

            <button className="menu-item" onClick={gotoFavorites}>
              <i className="fa fa-heart" /> Favorilerim
            </button>

            <button className="menu-item">
              <i className="fa fa-map-marker" /> Adreslerim
            </button>

            {/* Ödeme Yöntemleri artık ayrı sayfaya gider */}
            <button className="menu-item" onClick={gotoPaymentPage}>
              <i className="fa fa-credit-card" /> Ödeme Yöntemlerim
            </button>
          </div>
        </div>

        {/* SAĞ İÇERİK */}
        <div className="account-content">
          {activeTab === "profile" && (
            <div className="profile-details">
              <h2>Kişisel Bilgilerim</h2>

              <div className="edit-profile-form">
                <div className="form-group">
                  <label>Ad Soyad</label>
                  <input type="text" value={user.name} readOnly />
                  <button className="edit-button">Düzenle</button>
                </div>

                <div className="form-group">
                  <label>E‑posta Adresi</label>
                  <input type="email" value={user.email} readOnly />
                  <button className="edit-button">Düzenle</button>
                </div>

                <div className="form-group">
                  <label>Şifre</label>
                  <input type="password" value={user.password} readOnly />
                  <button className="edit-button">Değiştir</button>
                </div>

                <div className="form-group">
                  <label>Telefon Numarası</label>
                  <input type="tel" placeholder="Telefon numarası ekleyin" />
                  <button className="edit-button">Ekle</button>
                </div>

                <button className="save-button">Değişiklikleri Kaydet</button>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="orders-section orders-wrapper">
              {/* OrdersPage gömülü */}
              <OrdersPage isEmbedded />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
