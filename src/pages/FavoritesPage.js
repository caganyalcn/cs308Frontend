// src/pages/FavoritesPage.js
import React, { useContext } from "react";
import Header from "../components/Header";
import { AppContext } from "../AppContext";

const FavoritesPage = () => {
  const { favorites } = useContext(AppContext);

  return (
    <div style={{ marginTop: "100px" }}>
      <Header />
      <h2>Favorilerim</h2>
      {favorites.length === 0 ? (
        <p>Henüz favori eklemediniz.</p>
      ) : (
        favorites.map((item) => (
          <div key={item.id}>
            {item.name} - {item.price}
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesPage;
