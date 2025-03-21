import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { AppContext } from "../AppContext";
import products from "../data/products";
import "../styles/ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { cart, addToCart, removeFromCart, favorites, addToFavorites, removeFromFavorites } = useContext(AppContext);
  const [isInCart, setIsInCart] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (product) {
      setIsInCart(cart.some(item => item.id === product.id));
    }
  }, [cart, product]);

  if (!product) {
    return (
      <div style={{ marginTop: "100px" }}>
        <Header />
        <h2>Ürün Bulunamadı</h2>
      </div>
    );
  }

  const isFavorited = favorites.some(fav => fav.id === product.id);

  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleCartClick = () => {
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
    setIsInCart(!isInCart);
  };

  return (
    <div className="product-detail-container">
      <Header />
      <div className="product-detail">
        <img src={product.image} alt={product.name} />
        <div className="detail-info">
          <h2>{product.name}</h2>
          <p className="detail-price">{product.price}</p>
          <p className="detail-description">{product.description}</p>
          <p className="detail-rating">Rating: ⭐ {product.rating}</p>
          
          <button 
            onClick={handleCartClick} 
            className="detail-button" 
            style={{ background: isInCart ? "red" : "blue", color: "white" }}
          >
            {isInCart ? "Sepetten Çıkar" : "Sepete Ekle"}
          </button>
          
          <button 
            onClick={handleFavoriteClick} 
            className="detail-button" 
            style={{ background: isFavorited ? "gray" : "black", color: "white" }}
          >
            {isFavorited ? "Favorilerden Çıkar" : "Favorilere Ekle"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
