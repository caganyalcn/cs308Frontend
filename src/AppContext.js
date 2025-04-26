// src/AppContext.js
import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const API = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]); // [{product, quantity}]
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API}/api/products/products/`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Ürünler alınamadı", err);
      }
    };
    fetchProducts();
  }, []);

  // Fetch cart from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`${API}/api/products/get-cart/`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setCart(data.cart || []);
        }
      } catch (err) {
        console.error("Sepet alınamadı", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Favorites (local only)
  const addToFavorites = (product) => {
    if (!favorites.some((fav) => fav.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };
  const removeFromFavorites = (productId) => {
    setFavorites(favorites.filter(item => item.id !== productId));
  };

  // Add to cart (backend)
  const addToCart = async (product, quantity = 1) => {
    if (!product || product.stock_quantity === 0 || quantity <= 0) return;
    try {
      const res = await fetch(`${API}/api/products/add-to-cart/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ product_id: product.id, quantity }),
      });
      if (res.ok) {
        // Refresh cart
        const cartRes = await fetch(`${API}/api/products/get-cart/`, { credentials: "include" });
        if (cartRes.ok) {
          const data = await cartRes.json();
          setCart(data.cart || []);
    }
      }
    } catch (err) {
      console.error("Sepete eklenemedi", err);
    }
  };

  // Remove from cart (backend)
  const removeFromCart = async (productId) => {
    try {
      await fetch(`${API}/api/products/remove-from-cart/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ product_id: productId }),
      });
      // Refresh cart
      const cartRes = await fetch(`${API}/api/products/get-cart/`, { credentials: "include" });
      if (cartRes.ok) {
        const data = await cartRes.json();
        setCart(data.cart || []);
      }
    } catch (err) {
      console.error("Sepetten çıkarılamadı", err);
    }
  };

  // Update quantity (backend)
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      await removeFromCart(productId);
      return;
    }
    try {
      await fetch(`${API}/api/products/update-cart/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ product_id: productId, quantity: newQuantity }),
      });
      // Refresh cart
      const cartRes = await fetch(`${API}/api/products/get-cart/`, { credentials: "include" });
      if (cartRes.ok) {
        const data = await cartRes.json();
        setCart(data.cart || []);
      }
    } catch (err) {
      console.error("Adet güncellenemedi", err);
    }
  };

  // Helper
  const getProductInCart = (productId) => {
    return cart.find((item) => item.id === productId);
  };

  return (
    <AppContext.Provider value={{ 
      favorites, 
      cart, 
      products,
      loading,
      addToFavorites,
      removeFromFavorites, 
      addToCart,
      removeFromCart,
      updateQuantity,
      getProductInCart,
    }}>
      {children}
    </AppContext.Provider>
  );
};
