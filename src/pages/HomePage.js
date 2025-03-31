// src/pages/HomePage.js 
import React, { useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import "../styles/HomePage.css";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === "" || `${product.name} ${product.description}`.toLowerCase().includes(query);
    const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="home-page">
      <Header setSearchQuery={setSearchQuery} setSelectedCategory={setSelectedCategory} />
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Aradığınız ürün bulunamadı.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
