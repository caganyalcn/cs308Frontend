import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/PaymentMethodsPage.css";

const PaymentMethodsPage = ({ isEmbedded = false }) => {
  const navigate = useNavigate();

  const [cards, setCards] = useState([
    {
      id: 1,
      cardHolder: "Ahmet Yılmaz",
      cardNumber: "•••• •••• •••• 4532",
      expiryDate: "12/25",
      isDefault: true
    }
  ]);

  const [newCard, setNewCard] = useState({
    cardHolder: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    isDefault: false
  });

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + "/" + v.slice(2, 4);
    }
    return v;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
    } else if (name === "expiryDate") {
      formattedValue = formatExpiryDate(value);
    }

    if (editingCard) {
      setEditingCard({
        ...editingCard,
        [name]: type === 'checkbox' ? checked : formattedValue
      });
    } else {
      setNewCard(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : formattedValue
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCard) {
      setCards(cards.map(card => 
        card.id === editingCard.id ? {
          ...editingCard,
          cardNumber: "•••• •••• •••• " + editingCard.cardNumber.slice(-4)
        } : card
      ));
      setEditingCard(null);
    } else {
      const newId = Math.max(...cards.map(c => c.id), 0) + 1;
      const maskedCardNumber = "•••• •••• •••• " + newCard.cardNumber.slice(-4);
      setCards([...cards, { 
        ...newCard, 
        id: newId,
        cardNumber: maskedCardNumber
      }]);
      setNewCard({
        cardHolder: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        isDefault: false
      });
      setIsAddingNew(false);
    }
  };

  const handleEdit = (card) => {
    setEditingCard({
      ...card,
      cardNumber: "", // Clear masked number for editing
      cvv: "" // Clear CVV for security
    });
    setIsAddingNew(false);
  };

  const handleDelete = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const handleSetDefault = (id) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === id
    })));
  };

  const renderCardForm = (data, isEditing = false) => (
    <form className="new-card-form" onSubmit={handleSubmit}>
      <h3>{isEditing ? 'Kartı Düzenle' : 'Yeni Kart Ekle'}</h3>
      <div className="form-group">
        <label>Kart Üzerindeki İsim</label>
        <input
          type="text"
          name="cardHolder"
          value={data.cardHolder}
          onChange={handleInputChange}
          placeholder="AHMET YILMAZ"
          required
        />
      </div>
      <div className="form-group">
        <label>Kart Numarası</label>
        <input
          type="text"
          name="cardNumber"
          value={data.cardNumber}
          onChange={handleInputChange}
          placeholder="1234 5678 9012 3456"
          maxLength="19"
          required
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Son Kullanma Tarihi</label>
          <input
            type="text"
            name="expiryDate"
            value={data.expiryDate}
            onChange={handleInputChange}
            placeholder="AA/YY"
            maxLength="5"
            required
          />
        </div>
        <div className="form-group">
          <label>CVV</label>
          <input
            type="password"
            name="cvv"
            value={data.cvv}
            onChange={handleInputChange}
            placeholder="123"
            maxLength="3"
            required
          />
        </div>
      </div>
      <div className="form-group checkbox">
        <label>
          <input
            type="checkbox"
            name="isDefault"
            checked={data.isDefault}
            onChange={handleInputChange}
          />
          Varsayılan Ödeme Yöntemi Olarak Kaydet
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
              setEditingCard(null);
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
    <div className={isEmbedded ? "embedded-payment-methods" : "payment-methods-page"}>
      {!isEmbedded && (
        <>
          <Header />
          <div className="page-header">
            <button className="back-button" onClick={() => navigate(-1)}>
              <i className="fa fa-arrow-left"></i> Geri Dön
            </button>
            <h2 className="payment-methods-title">Ödeme Yöntemlerim</h2>
          </div>
        </>
      )}
      {isEmbedded && <h2 className="payment-methods-title">Ödeme Yöntemlerim</h2>}

      <div className="payment-methods-container">
        {cards.map(card => (
          <div key={card.id} className="card-item">
            <div className="card-header">
              <h3>{card.cardHolder}</h3>
              {card.isDefault && <span className="default-badge">Varsayılan</span>}
            </div>
            <div className="card-details">
              <p className="card-number">{card.cardNumber}</p>
              <p className="card-expiry">Son Kullanma: {card.expiryDate}</p>
            </div>
            <div className="card-actions">
              {!card.isDefault && (
                <button 
                  className="set-default-btn"
                  onClick={() => handleSetDefault(card.id)}
                >
                  Varsayılan Yap
                </button>
              )}
              <button 
                className="edit-btn"
                onClick={() => handleEdit(card)}
              >
                Düzenle
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(card.id)}
              >
                Sil
              </button>
            </div>
          </div>
        ))}

        {!isAddingNew && !editingCard && (
          <button 
            className="add-card-btn"
            onClick={() => setIsAddingNew(true)}
          >
            Yeni Kart Ekle
          </button>
        )}

        {isAddingNew && renderCardForm(newCard)}
        {editingCard && renderCardForm(editingCard, true)}
      </div>
    </div>
  );
};

export default PaymentMethodsPage; 