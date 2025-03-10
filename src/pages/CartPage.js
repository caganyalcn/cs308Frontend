// src/pages/CartPage.js
import React, { useContext } from "react";
import Header from "../components/Header";
import { AppContext } from "../AppContext";

const CartPage = () => {
  const { cart } = useContext(AppContext);

  return (
    <div style={{ marginTop: "100px" }}>
      <Header />
      <h2>Sepetim</h2>
      {cart.length === 0 ? (
        <p>Sepetiniz boş.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id}>
            {item.name} - {item.price}
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;
