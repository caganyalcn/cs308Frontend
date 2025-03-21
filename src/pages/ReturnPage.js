import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/ReturnPage.css";

const ReturnPage = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [returnReason, setReturnReason] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [description, setDescription] = useState("");

  // Sample orders data
  const orders = [
    {
      id: 1,
      date: "17 Mart 2025 - 12:28",
      total: "3.039,80 TL",
      items: [
        { id: 101, name: "Ürün 1", price: "999,90 TL", image: "https://via.placeholder.com/50" },
        { id: 102, name: "Ürün 2", price: "1.099,90 TL", image: "https://via.placeholder.com/50" },
        { id: 103, name: "Ürün 3", price: "940,00 TL", image: "https://via.placeholder.com/50" },
      ],
    },
    {
      id: 2,
      date: "15 Mart 2025 - 12:16",
      total: "595 TL",
      items: [
        { id: 104, name: "Ürün 4", price: "595,00 TL", image: "https://via.placeholder.com/50" },
      ],
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedItems.length === 0) {
      alert("Lütfen en az bir ürün seçin");
      return;
    }
    
    setIsFormSubmitted(true);
    // In a real application, you would send this data to your server
  };

  // Go back to account page instead of orders page
  const handleBackToAccount = () => {
    navigate("/hesabim");
  };

  // Handle item selection
  const handleItemSelect = (itemId) => {
    setSelectedItems(prevSelected => {
      if (prevSelected.includes(itemId)) {
        return prevSelected.filter(id => id !== itemId);
      } else {
        return [...prevSelected, itemId];
      }
    });
  };

  // Return reasons
  const returnReasons = [
    "Ürün beklediğim gibi değil",
    "Yanlış ürün gönderildi",
    "Ürün hasarlı geldi",
    "Ürün artık gerekli değil",
    "Diğer"
  ];

  return (
    <div className="return-page">
      <Header />
      
      {!isFormSubmitted ? (
        <>
          <h2 className="return-title">İade Talebi Oluştur</h2>
          
          {!selectedOrder ? (
            <div className="orders-selection">
              <p className="select-info">İade etmek istediğiniz siparişi seçin:</p>
              
              {orders.map((order) => (
                <div key={order.id} className="order-item">
                  <div className="order-info">
                    <p><strong>Sipariş #{order.id}</strong></p>
                    <p>Tarih: {order.date}</p>
                    <p>Tutar: {order.total}</p>
                  </div>
                  
                  <div className="order-items-preview">
                    {order.items.map((item) => (
                      <img key={item.id} src={item.image} alt={item.name} className="item-image" />
                    ))}
                  </div>
                  
                  <button 
                    className="select-order-button"
                    onClick={() => setSelectedOrder(order)}
                  >
                    Bu Siparişi Seç
                  </button>
                </div>
              ))}
              
              <button className="back-button" onClick={handleBackToAccount}>
                Vazgeç
              </button>
            </div>
          ) : (
            <div className="return-form-container">
              <h3>Sipariş #{selectedOrder.id} için İade Talebi</h3>
              
              <div className="items-selection">
                <p>İade etmek istediğiniz ürünleri seçin:</p>
                
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="item-select">
                    <input 
                      type="checkbox" 
                      id={`item-${item.id}`} 
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleItemSelect(item.id)}
                    />
                    <label htmlFor={`item-${item.id}`} className="item-label">
                      <img src={item.image} alt={item.name} className="item-image" />
                      <div className="item-details">
                        <p className="item-name">{item.name}</p>
                        <p className="item-price">{item.price}</p>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="return-reason">
                <p>İade sebebiniz:</p>
                <select 
                  value={returnReason} 
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="reason-select"
                >
                  <option value="">Sebep seçin</option>
                  {returnReasons.map((reason, index) => (
                    <option key={index} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>
              
              <div className="return-description">
                <p>Ek açıklama:</p>
                <textarea 
                  className="description-input" 
                  placeholder="İade sebebiniz hakkında daha fazla bilgi verin..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              
              <div className="form-buttons">
                <button className="back-button" onClick={() => setSelectedOrder(null)}>
                  Geri
                </button>
                <button 
                  className="submit-button" 
                  onClick={handleSubmit}
                  disabled={!returnReason || selectedItems.length === 0}
                >
                  İade Talebi Oluştur
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2>İade Talebiniz Alındı!</h2>
          <p>İade talebiniz başarıyla oluşturuldu. Talebinizin durumu hakkında e-posta ile bilgilendirileceksiniz.</p>
          <p>Talep Numarası: <strong>RTN-{Math.floor(100000 + Math.random() * 900000)}</strong></p>
          <button className="back-to-account" onClick={handleBackToAccount}>
            Hesabıma Dön
          </button>
        </div>
      )}
    </div>
  );
};

export default ReturnPage;