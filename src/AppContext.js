// src/AppContext.js
import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  const addToFavorites = (product) => {
    if (!favorites.some((fav) => fav.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (productId) => {
    setFavorites(favorites.filter(item => item.id !== productId));
  };

  const addToCart = (product) => {
    if (!cart.some((c) => c.id === product.id)) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      // Eğer ürün zaten sepette varsa, miktarını artır
      updateQuantity(product.id, (cart.find(item => item.id === product.id)?.quantity || 1) + 1);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      // Eğer miktar 0 veya daha küçükse ürünü kaldır
      removeFromCart(productId);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };

  return (
    <AppContext.Provider value={{ 
      favorites, 
      cart, 
      addToFavorites,
      removeFromFavorites, 
      addToCart,
      removeFromCart,
      updateQuantity
    }}>
      {children}
    </AppContext.Provider>
  );
};
