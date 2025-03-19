import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { AppContext } from "../AppContext";
import products from "../data/products";
import "../styles/ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { cart, addToCart, removeFromCart, favorites, addToFavorites, removeFromFavorites } = useContext(AppContext);
  const [isInCart, setIsInCart] = useState(false); // State ekledik

  const product = products.find((p) => p.id === parseInt(id));

  // **useEffect ile Sepet Durumunu Anlık Güncelle**
  useEffect(() => {
    if (product) {
      setIsInCart(cart.some(item => item.id === product.id)); // Sepette olup olmadığını kontrol et
    }
  }, [cart, product]); // `cart` veya `product` değişirse butonu güncelle

  if (!product) {
    return (
      <div style={{ marginTop: "100px" }}>
        <Header />
        <h2>Ürün Bulunamadı</h2>
      </div>
    );
  }

  // Ürün favorilerde mi kontrol et
  const isFavorited = favorites.some(fav => fav.id === product.id);

  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFromFavorites(product.id); // Favorilerden çıkar
    } else {
      addToFavorites(product); // Favorilere ekle
    }
  };

  // **Sepete Ekle/Çıkar Butonu Mantığı**
  const handleCartClick = () => {
    if (isInCart) {
      removeFromCart(product.id); // Sepetten çıkar
    } else {
      addToCart(product); // Sepete ekle
    }
    setIsInCart(!isInCart); // **Butonun anında güncellenmesini sağla**
  };

  return (
    <div className="product-detail-container">
      <Header />
      <div className="product-detail">
        <img src={product.image} alt={product.name} />
        <div className="detail-info">
          <h2>{product.name}</h2>
          <p className="detail-price">{product.price}</p>
          
          {/* **Sepete Ekle/Çıkar Butonu** */}
          <button 
            onClick={handleCartClick} 
            className="detail-button"
            style={{ background: isInCart ? "red" : "blue", color: "white" }}
          >
            {isInCart ? "Sepetten Çıkar" : "Sepete Ekle"}
          </button>

          {/* **Favorilere Ekle/Çıkar Butonu** */}
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
