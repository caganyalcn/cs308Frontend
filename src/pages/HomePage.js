import React, { useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import "../styles/HomePage.css";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase().trim();
    if (query === "") return true;

    const queryWords = query.split(" ").filter(Boolean);
    const allText = `${product.name} ${product.description}`.toLowerCase();
    const textWords = allText.split(/\s+/);

    return queryWords.every((queryWord) =>
      textWords.some((textWord) => textWord.startsWith(queryWord))
    );
  });

  return (
    <div className="home-page">
      <Header setSearchQuery={setSearchQuery} />
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
