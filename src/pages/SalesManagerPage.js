import React, { useState } from 'react';
import '../styles/SalesManagerPage.css'; 

const SalesManagerPage = () => {
  // State for Set Product Price section
  const [productIdPrice, setProductIdPrice] = useState('');
  const [newPrice, setNewPrice] = useState('');

  // State for Apply Discount section
  const [productIdDiscount, setProductIdDiscount] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');

  const handleSetPrice = () => {
    // Placeholder for backend API call
    console.log(`Setting price for product ${productIdPrice} to ${newPrice}`);
    alert(`Price for product ${productIdPrice} set to ${newPrice}`);
    setProductIdPrice('');
    setNewPrice('');
  };

  const handleApplyDiscount = () => {
    // Placeholder for backend API call
    console.log(`Applying ${discountPercentage}% discount to product ${productIdDiscount}`);
    alert(`Applied ${discountPercentage}% discount to product ${productIdDiscount}`);
    setProductIdDiscount('');
    setDiscountPercentage('');
  };

  return (
    <div className="sales-manager-page">
      <h1>Sales Manager Dashboard</h1>
      {/* <p>Welcome to the Sales Manager Dashboard. Features will be added here.</p> */}
      
      <div className="feature-section">
        <h2>Set Product Price</h2>
        <div className="form-group">
          <label htmlFor="productIdPrice">Product ID:</label>
          <input 
            type="text" 
            id="productIdPrice"
            value={productIdPrice}
            onChange={(e) => setProductIdPrice(e.target.value)}
            placeholder="Enter product ID"
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPrice">New Price:</label>
          <input 
            type="number" 
            id="newPrice"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            placeholder="Enter new price"
            step="0.01"
          />
        </div>
        <button onClick={handleSetPrice} className="action-button">
          Set Price
        </button>
      </div>

      <div className="feature-section">
        <h2>Apply Discount</h2>
        <div className="form-group">
          <label htmlFor="productIdDiscount">Product ID:</label>
          <input 
            type="text" 
            id="productIdDiscount"
            value={productIdDiscount}
            onChange={(e) => setProductIdDiscount(e.target.value)}
            placeholder="Enter product ID"
          />
        </div>
        <div className="form-group">
          <label htmlFor="discountPercentage">Discount Percentage (%):</label>
          <input 
            type="number" 
            id="discountPercentage"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            placeholder="Enter discount % (e.g., 10)"
            step="1"
            min="0"
            max="100"
          />
        </div>
        <button onClick={handleApplyDiscount} className="action-button">
          Apply Discount
        </button>
      </div>

      {/* More sections will be added here */}
    </div>
  );
};

export default SalesManagerPage; 