// src/pages/CartPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/CartPage.css";

const API = process.env.REACT_APP_API_BASE_URL || "";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`${API}/api/cart/`, { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setCartItems(data.items);
        }
      } catch (err) {
        console.error("Sepet yüklenemedi", err);
      }
      setLoading(false);
    };

    fetchCart();
  }, []);

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const res = await fetch(`${API}/api/cart/update/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ product_id: productId, quantity: newQuantity })
      });
      if (res.ok) {
        setCartItems((prev) =>
          prev.map((item) =>
            item.product.id === productId ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    } catch (err) {
      console.error("Adet güncellenemedi", err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await fetch(`${API}/api/cart/remove/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ product_id: productId })
      });
      setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    } catch (err) {
      console.error("Ürün silinemedi", err);
    }
  };

  const cartTotal = cartItems.reduce((total, item) => {
    return total + parseFloat(item.product.price) * item.quantity;
  }, 0);

  const formatPrice = (price) =>
    price.toLocaleString("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) + " TL ₺";

  return (
    <div className="cart-page-container">
      <Header />
      <div className="cart-content">
        <h2 className="cart-title">Sepetim</h2>

        {loading ? (
          <p>Yükleniyor…</p>
        ) : cartItems.length === 0 ? (
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
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="cart-item">
                  <div className="item-image-container">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="item-image" />
                    ) : (
                      <div className="item-image-placeholder"></div>
                    )}
                  </div>

                  <div className="item-details">
                    <h3 className="item-name">{product.name}</h3>
                    <p className="item-price">{formatPrice(product.price)}</p>
                  </div>

                  <div className="item-actions">
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity-value">{quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-item"
                      onClick={() => removeFromCart(product.id)}
                      aria-label={`Sepetten ${product.name} ürününü kaldır`}
                      style={{ background: "none", border: "none", color: "red", fontSize: "20px", cursor: "pointer" }}
                    >
                      ❌
                    </button>
                  </div>

                  <div className="item-total">{formatPrice(product.price * quantity)}</div>
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

