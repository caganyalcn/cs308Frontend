// src/pages/HomePage.js
import React from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import "../styles/HomePage.css";

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
