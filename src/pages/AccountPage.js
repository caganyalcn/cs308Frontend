// Updated React AccountPage with editable fields and backend integration
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import OrdersPage from "./OrdersPage";
import "../styles/AccountPage.css";
import { AppContext } from "../AppContext";

const API = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

const AccountPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });
  const [activeTab, setActiveTab] = useState("profile");
  const { logout } = useContext(AppContext);

  useEffect(() => {
    fetch(`${API}/api/accounts/me/`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setFormData({ name: data.user.name, email: data.user.email, address: data.user.delivery_address || "" });
      })
      .catch((err) => console.error("Kullanıcı verileri alınamadı", err));
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
            {/* <img src={"https://via.placeholder.com/150"} alt={user.name} className="profile-picture" /> */}
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          <div className="sidebar-menu">
            <button className={`menu-item ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab("profile")}> <i className="fa fa-user" /> Profil Bilgilerim</button>
            <button className={`menu-item ${activeTab === "orders" ? "active" : ""}`} onClick={() => setActiveTab("orders")}> <i className="fa fa-shopping-bag" /> Siparişlerim</button>
            <button className="menu-item" onClick={gotoFavorites}><i className="fa fa-heart" /> Favorilerim</button>
            <button className="menu-item" onClick={gotoPaymentPage}><i className="fa fa-credit-card" /> Ödeme Yöntemlerim</button>
            <button className="menu-item" onClick={logout} style={{ backgroundColor: "#dc3545", color: "white" }}><i className="fa fa-sign-out" /> Çıkış Yap</button>
          </div>
        </div>

        <div className="account-content">
          {activeTab === "profile" && (
            <div className="profile-details">
              <h2>Kişisel Bilgilerim</h2>
              <div className="edit-profile-form">
                {['name', 'email', 'address'].map((field) => (
                  <div className="form-group" key={field}>
                    <label>{field === 'name' ? 'Ad Soyad' : field === 'email' ? 'E-Posta Adresi' : 'Adres'}</label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      value={formData[field]}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      readOnly
                    />
                  </div>
                ))}
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
