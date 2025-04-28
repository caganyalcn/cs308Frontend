import React, { useState, useContext, useMemo } from "react";
import Header from "../components/Header";
import ProductCard from "../data/ProductCard";
import { AppContext } from "../AppContext";
import "../styles/HomePage.css";

/* fiyatı string → number çevir   ("39,90 TL"  →  39.90) */
const parsePrice = (p) =>
  Number(
    String(p)
      .replace(/[^\d,.-]/g, "")   // TL, boşluk vb. sil
      .replace(",", ".")          // ondalık virgülü noktaya çevir
  );

function HomePage() {
  const { products } = useContext(AppContext);

  const [searchQuery,   setSearchQuery]  = useState("");
  const [selectedCat,   setSelectedCat]  = useState("");
  const [sortOption,    setSortOption]   = useState(""); // "", "priceAsc", "priceDesc", "popular"

  /* filtre + sıralama */
  const filteredProducts = useMemo(() => {
    let list = [...products];

    /* arama */
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) =>
        `${p.name} ${p.description}`.toLowerCase().includes(q)
      );
    }

    /* kategori */
    if (selectedCat) {
      list = list.filter((p) => p.category === selectedCat);
    }

    /* sıralama */
    switch (sortOption) {
      case "priceAsc":
        list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case "priceDesc":
        list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case "popular":
        list.sort((a, b) => b.avg_rating - a.avg_rating);
        break;
      default:
        break;
    }
    return list;
  }, [products, searchQuery, selectedCat, sortOption]);

  return (
    <div className="home-page">
      <Header
        setSearchQuery={setSearchQuery}
        setSelectedCategory={setSelectedCat}
        onSortChange={setSortOption}
      />

      <div className="products-grid">
        {filteredProducts.length ? (
          filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))
        ) : (
          <p>Aradığınız ürün bulunamadı.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
