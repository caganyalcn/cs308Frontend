import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import OrdersPage from "./OrdersPage";
import "../styles/AccountPage.css";

const AccountPage = () => {
  const navigate = useNavigate();
  
  // User data
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    profilePicture: "https://via.placeholder.com/150",
    password: "••••••••", // For display only
  };

  // State for active tab
  const [activeTab, setActiveTab] = useState("profile");

  // Handle navigation
  const navigateToFavorites = () => {
    navigate("/favorites");
  };

  const navigateToAddresses = () => {
    navigate("/hesabim/adreslerim");
  };

  const navigateToPaymentMethods = () => {
    navigate("/hesabim/odeme-yontemlerim");
  };

  return (
    <div className="account-page">
      <Header />
      <div className="page-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fa fa-arrow-left"></i> Geri Dön
        </button>
        <h2 className="account-title">Hesabım</h2>
      </div>
      
      <div className="account-container">
        <div className="account-sidebar">
          <div className="profile-summary">
            <img
              src={user.profilePicture}
              alt={user.name}
              className="profile-picture"
            />
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          
          <div className="sidebar-menu">
            <button 
              className={`menu-item ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <i className="fa fa-user"></i> Profil Bilgilerim
            </button>
            <button 
              className={`menu-item ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <i className="fa fa-shopping-bag"></i> Siparişlerim
            </button>
            <button 
              className="menu-item"
              onClick={navigateToFavorites}
            >
              <i className="fa fa-heart"></i> Favorilerim
            </button>
            <button 
              className="menu-item"
              onClick={navigateToAddresses}
            >
              <i className="fa fa-map-marker"></i> Adreslerim
            </button>
            <button 
              className="menu-item"
              onClick={navigateToPaymentMethods}
            >
              <i className="fa fa-credit-card"></i> Ödeme Yöntemlerim
            </button>
          </div>
        </div>
        
        <div className="account-content">
          {activeTab === "profile" && (
            <div className="profile-details">
              <h2>Kişisel Bilgilerim</h2>
              <div className="edit-profile-form">
                <div className="form-group">
                  <label>Ad Soyad</label>
                  <input type="text" value={user.name} readOnly />
                  <button className="edit-button">Düzenle</button>
                </div>
                <div className="form-group">
                  <label>E-posta Adresi</label>
                  <input type="email" value={user.email} readOnly />
                  <button className="edit-button">Düzenle</button>
                </div>
                <div className="form-group">
                  <label>Şifre</label>
                  <input type="password" value={user.password} readOnly />
                  <button className="edit-button">Değiştir</button>
                </div>
                <div className="form-group">
                  <label>Telefon Numarası</label>
                  <input type="tel" placeholder="Telefon numarası ekleyin" />
                  <button className="edit-button">Ekle</button>
                </div>
                <button className="save-button">Değişiklikleri Kaydet</button>
              </div>
            </div>
          )}
          
          {activeTab === "orders" && (
            <div className="orders-section orders-wrapper">
              <OrdersPage isEmbedded={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;