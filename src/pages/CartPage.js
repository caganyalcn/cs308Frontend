import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import Header from "../components/Header";
import { AppContext } from "../AppContext";
import "../styles/CartPage.css"; 

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(AppContext);
  const navigate = useNavigate();

  const cartTotal = cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace(',', '.')) || 0; // TL formatından dönüşüm
    const quantity = item.quantity || 1;
    return total + price * quantity;
  }, 0);

  const formatPrice = (price) => {
    return price.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " TL ₺";
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
            <button className="continue-shopping" onClick={() => navigate("/home")}>
              Alışverişe Devam Et
            </button>
          </div>
        ) : (
          <div className="cart-details">
            <div className="cart-items">
              {cart.map((item) => {
                const price = parseFloat(item.price.replace(',', '.')) || 0;
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
                      <p className="item-price">{formatPrice(price)}</p>
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
                        style={{ background: "none", border: "none", color: "red", fontSize: "20px", cursor: "pointer" }}
                      >
                        ❌
                      </button>
                    </div>
                    
                    <div className="item-total">
                      {formatPrice(itemTotal)}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="cart-summary">
              <h3>Sipariş Özeti</h3>
              <div className="summary-row">
                <span>Ara Toplam</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="summary-row">
                <span>Kargo</span>
                <span>{cart.length > 0 ? "Ücretsiz" : "0 TL ₺"}</span>
              </div>
              <div className="summary-row total">
                <span>Toplam</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              
              <button className="checkout-button" onClick={() => navigate("/payment")}>
                Ödemeye Geç
              </button>
              
              <button className="continue-shopping-link" onClick={() => navigate("/home")}>
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
