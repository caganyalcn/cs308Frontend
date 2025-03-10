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

  const addToCart = (product) => {
    if (!cart.some((c) => c.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  return (
    <AppContext.Provider value={{ favorites, cart, addToFavorites, addToCart }}>
      {children}
    </AppContext.Provider>
  );
};
