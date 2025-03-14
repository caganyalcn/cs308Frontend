// src/pages/CartPage.js
import React, { useContext } from "react";
import Header from "../components/Header";
import { AppContext } from "../AppContext";
import "../styles/CartPage.css"; // New CSS file for cart styling

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(AppContext);
  
  // Calculate cart total - properly handle numeric values
  const cartTotal = cart.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = item.quantity || 1;
    return total + (price * quantity);
  }, 0);

  // Format price helper function
  const formatPrice = (price) => {
    return price.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="cart-page-container">
      <Header />
      <div className="cart-content">
        <h2 className="cart-title">Sepetim</h2>
        
        {cart.length === 0 ? (
          <div className="empty-cart">
            <i className="fa fa-shopping-cart empty-cart-icon"></i>
            <p>Sepetiniz boş.</p>
            <button className="continue-shopping">Alışverişe Devam Et</button>
          </div>
        ) : (
          <div className="cart-details">
            <div className="cart-items">
              {cart.map((item) => {
                const price = parseFloat(item.price) || 0;
                const quantity = item.quantity || 1;
                const itemTotal = price * quantity;
                
                return (
                  <div key={item.id} className="cart-item">
                    <div className="item-image-container">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="item-image" />
                      ) : (
                        <div className="item-image-placeholder"></div>
                      )}
                    </div>
                    
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-price">{formatPrice(price)} TL ₺</p>
                    </div>
                    
                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <span className="quantity-value">{quantity}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        className="remove-item"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Sepetten ${item.name} ürününü kaldır`}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                    
                    <div className="item-total">
                      {formatPrice(itemTotal)} TL ₺
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="cart-summary">
              <h3>Sipariş Özeti</h3>
              <div className="summary-row">
                <span>Ara Toplam</span>
                <span>{formatPrice(cartTotal)} TL ₺</span>
              </div>
              <div className="summary-row">
                <span>Kargo</span>
                <span>{cart.length > 0 ? "Ücretsiz" : "0 TL ₺"}</span>
              </div>
              <div className="summary-row total">
                <span>Toplam</span>
                <span>{formatPrice(cartTotal)} TL ₺</span>
              </div>
              
              <button className="checkout-button">
                Ödemeye Geç
              </button>
              
              <button className="continue-shopping-link">
                Alışverişe Devam Et
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;