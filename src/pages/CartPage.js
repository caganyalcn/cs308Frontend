// src/pages/CartPage.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { AppContext } from "../AppContext";
import "../styles/CartPage.css";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, loading } = useContext(AppContext);
  const navigate = useNavigate();

  const cartTotal = cart.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity;
  }, 0);

  const formatPrice = (price) =>
    price.toLocaleString("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " TL ₺";

  return (
    <div className="cart-page-container">
      <Header />
      <div className="cart-content">
        <h2 className="cart-title">Sepetim</h2>

        {loading ? (
          <p>Yükleniyor…</p>
        ) : cart.length === 0 ? (
          <div className="empty-cart">
            <i className="fa fa-shopping-cart empty-cart-icon"></i>
            <p>Sepetiniz boş.</p>
            <button className="continue-shopping" onClick={() => navigate("/home")}>Alışverişe Devam Et</button>
          </div>
        ) : (
          <div className="cart-details">
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image-container">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.name} className="item-image" />
                    ) : (
                      <div className="item-image-placeholder"></div>
                    )}
                  </div>

                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-price">{formatPrice(item.price)}</p>
                  </div>

                  <div className="item-actions">
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-item"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Sepetten ${item.name} ürününü kaldır`}
                      style={{ background: "none", border: "none", color: "red", fontSize: "20px", cursor: "pointer" }}
                    >
                      ❌
                    </button>
                  </div>

                  <div className="item-total">{formatPrice(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Sipariş Özeti</h3>
              <div className="summary-row">
                <span>Ara Toplam</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="summary-row">
                <span>Kargo</span>
                <span>Ücretsiz</span>
              </div>
              <div className="summary-row total">
                <span>Toplam</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              <button className="checkout-button" onClick={() => navigate("/payment")}>Ödemeye Geç</button>
              <button className="continue-shopping-link" onClick={() => navigate("/home")}>Alışverişe Devam Et</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

