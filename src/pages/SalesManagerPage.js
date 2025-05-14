import React, { useState } from 'react';
import '../styles/SalesManagerPage.css'; 

const SalesManagerPage = () => {
  const [productId, setProductId] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const handleSetPrice = () => {
    // Placeholder for backend API call
    console.log(`Setting price for product ${productId} to ${newPrice}`);
    alert(`Price for product ${productId} set to ${newPrice}`);
    // Clear fields after submission (optional)
    setProductId('');
    setNewPrice('');
  };

  return (
    <div className="sales-manager-page">
      <h1>Sales Manager Dashboard</h1>
      {/* <p>Welcome to the Sales Manager Dashboard. Features will be added here.</p> */}
      
      <div className="feature-section">
        <h2>Set Product Price</h2>
        <div className="form-group">
          <label htmlFor="productId">Product ID:</label>
          <input 
            type="text" 
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
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

      {/* More sections will be added here */}
    </div>
  );
};

export default SalesManagerPage; 