// src/pages/FavoritesPage.js
import React, { useContext } from "react";
import Header from "../components/Header";
import { AppContext } from "../AppContext";

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useContext(AppContext);

  return (
    <div style={{ marginTop: "100px" }}>
      <Header />
      <h2>Favorilerim</h2>
      {favorites.length === 0 ? (
        <p>Henüz favori eklemediniz.</p>
      ) : (
        favorites.map((item) => (
          <div 
            key={item.id} 
            style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", borderBottom: "1px solid #ddd" }}
          >
            {/* Küçük Ürün Resmi */}
            <img 
              src={item.image} 
              alt={item.name} 
              style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }} 
            />
            <span>{item.name} - {item.price}</span>

            {/* Favorilerden Çıkarma Butonu */}
            <button 
              onClick={() => removeFromFavorites(item.id)} 
              style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "5px" }}
            >
              ❌
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesPage;
