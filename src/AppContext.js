// src/AppContext.js
import React, { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AppContext = createContext();

const API = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]); // [{product, quantity}]
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API}/api/accounts/me/`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(true);
          setCurrentUser(data.user);
        } else {
          setIsAuthenticated(false);
          setCurrentUser(null);
        }
      } catch (err) {
        console.error("Auth check failed", err);
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    };
    checkAuth();
  }, []);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}/api/products/products/`, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error('API response for products in AppContext is not in expected format:', data);
          setProducts([]);
        }
      } else {
        console.error('Failed to fetch products:', res.status);
        setProducts([]);
      }
    } catch (err) {
      console.error("Error fetching products in AppContext:", err);
      setProducts([]);
    }
  };

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      const res = await fetch(`${API}/api/products/get-cart/`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setCart(data.cart || []);
      }
    } catch (err) {
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch favorites from backend
  const fetchFavorites = async () => {
    try {
      const res = await fetch(`${API}/api/products/favorites/`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        // Extract product objects from favorite entries
        setFavorites((data.favorites || []).map(fav => fav.product));
      } else {
        console.error('Failed to fetch favorites:', res.status);
        setFavorites([]);
      }
    } catch (err) {
      console.error('Error fetching favorites:', err);
      setFavorites([]);
    }
  };

  // Initialize favorites on auth change
  useEffect(() => {
    if (isAuthenticated) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated]);

  // Favorites (backend)
  const addToFavorites = async (product) => {
    try {
      const res = await fetch(`${API}/api/products/favorites/add/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ product_id: product.id }),
      });
      if (!res.ok) console.error('Failed to add favorite:', res.status);
    } catch (err) {
      console.error('Error adding favorite:', err);
    } finally {
      fetchFavorites();
    }
  };

  const removeFromFavorites = async (productId) => {
    try {
      const res = await fetch(`${API}/api/products/favorites/remove/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ product_id: productId }),
      });
      if (!res.ok) console.error('Failed to remove favorite:', res.status);
    } catch (err) {
      console.error('Error removing favorite:', err);
    } finally {
      fetchFavorites();
    }
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

  // Logout function
  const logout = async () => {
    try {
      const res = await fetch(`${API}/api/accounts/logout/`, {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        // Clear any local state if needed
        setCart([]);
        setFavorites([]);
        setIsAuthenticated(false);
        setCurrentUser(null);
        // Redirect to login page
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API}/api/accounts/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        setCurrentUser(data.user);
        return { success: true, role: data.role, user: data.user };
      } else {
        const error = await res.json();
        return { success: false, message: error.message };
      }
    } catch (err) {
      console.error("Login failed", err);
      return { success: false, message: "An error occurred during login" };
    }
  };

  return (
    <AppContext.Provider value={{ 
      favorites, 
      cart, 
      products,
      loading,
      isAuthenticated,
      currentUser,
      addToFavorites,
      removeFromFavorites, 
      addToCart,
      removeFromCart,
      updateQuantity,
      getProductInCart,
      logout,
      login,
      fetchCart,
      fetchProducts,
      fetchFavorites,
    }}>
      {children}
    </AppContext.Provider>
  );
};
