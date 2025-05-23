// src/pages/FavoritesPage.js
import React, { useContext } from "react";
import Header from "../components/Header";
import { AppContext } from "../AppContext";
import "../styles/FavoritesPage.css";

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useContext(AppContext);

  return (
    <div className="favorites-page">
      <Header />
      <h2 className="favorites-title">Favorilerim</h2>
      {favorites.length === 0 ? (
        <p className="empty-message">Henüz favori eklemediniz.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((item) => (
           <div key={item.id} className="favorite-card">
           <img src={item.image_url} alt={item.name} className="favorite-image" />
           <div className="favorite-info">
             <h3 className="product-name">{item.name}</h3>
             <p className="favorite-description">{item.description}</p>
             <p className="favorite-price">{item.price}</p>
             <button
               className="remove-button"
               onClick={() => removeFromFavorites(item.id)}
             >
               🗑️ Kaldır
             </button>
           </div>
         </div>
         
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
