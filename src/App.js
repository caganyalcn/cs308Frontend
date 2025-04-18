// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./AppContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductRatingsPage from "./pages/ProductRatingsPage";
import AddRatingPage from "./pages/AddRatingPage";
import FavoritesPage from "./pages/FavoritesPage";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import OrdersPage from "./pages/OrdersPage";
import ReturnPage from "./pages/ReturnPage";
import AccountPage from "./pages/AccountPage";
import PaymentMethodsPage from "./pages/PaymentMethodsPage"; 
import AddressesPage from "./pages/AddressesPage"; 

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/product/:id/ratings" element={<ProductRatingsPage />} />
          <Route path="/product/:id/ratings/add" element={<AddRatingPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/return" element={<ReturnPage />} />
          <Route path="/hesabim" element={<AccountPage />} />
          <Route path="/payment-methods" element={<PaymentMethodsPage />} />
          <Route path="/addresses" element={<AddressesPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;