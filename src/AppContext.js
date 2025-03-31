// src/AppContext.js
import React, { createContext, useState } from "react";
import initialProducts from "./data/products";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(initialProducts);

  const addToFavorites = (product) => {
    if (!favorites.some((fav) => fav.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (productId) => {
    setFavorites(favorites.filter(item => item.id !== productId));
  };

  const addToCart = (product) => {
    if (product.stock === 0) return;

    if (!cart.some((c) => c.id === product.id)) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      updateQuantity(product.id, getProductInCart(product.id).quantity + 1);
    }

    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, stock: p.stock - 1 } : p
      )
    );
  };

  const removeFromCart = (productId) => {
    const productInCart = cart.find((item) => item.id === productId);
    if (productInCart) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId
            ? { ...p, stock: p.stock + productInCart.quantity }
            : p
        )
      );
    }
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const currentInCart = getProductInCart(productId)?.quantity || 0;
    const stockChange = currentInCart - newQuantity;

    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, stock: p.stock + stockChange } : p
      )
    );

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getProductInCart = (productId) => {
    return cart.find((item) => item.id === productId);
  };

  return (
    <AppContext.Provider value={{ 
      favorites, 
      cart, 
      products,
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
