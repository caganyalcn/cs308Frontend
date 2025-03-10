// src/pages/ProductDetailPage.js
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { AppContext } from "../AppContext";
import products from "../data/products";
import "../styles/ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart, addToFavorites } = useContext(AppContext);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div style={{ marginTop: "100px" }}>
        <Header />
        <h2>Ürün Bulunamadı</h2>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <Header />
      <div className="product-detail">
        <img src={product.image} alt={product.name} />
        <div className="detail-info">
          <h2>{product.name}</h2>
          <p className="detail-price">{product.price}</p>
          <button onClick={() => addToCart(product)} className="detail-button">
            Sepete Ekle
          </button>
          <button onClick={() => addToFavorites(product)} className="detail-button">
            Favorilere Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
