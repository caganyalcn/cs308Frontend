import React, { useState } from 'react';
import '../styles/SalesManagerPage.css'; 

const SalesManagerPage = () => {
  const [productIdPrice, setProductIdPrice] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [productIdDiscount, setProductIdDiscount] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [productIdNotification, setProductIdNotification] = useState('');
  const [startDateInv, setStartDateInv] = useState('');
  const [endDateInv, setEndDateInv] = useState('');
  const [invoices, setInvoices] = useState([]);
  const [viewingInvoices, setViewingInvoices] = useState(false);
  const [startDateRev, setStartDateRev] = useState('');
  const [endDateRev, setEndDateRev] = useState('');
  const [defaultCostPercentage, setDefaultCostPercentage] = useState('60');
  const [revenueReport, setRevenueReport] = useState(null);

  const [priceSuccess, setPriceSuccess] = useState(false);
  const [discountSuccess, setDiscountSuccess] = useState(false);
  const [notificationSuccess, setNotificationSuccess] = useState(false);

  const handleSetPrice = () => {
    console.log(`Setting price for product ${productIdPrice} to ${newPrice}`);
    setProductIdPrice('');
    setNewPrice('');
    setPriceSuccess(true);
    setTimeout(() => setPriceSuccess(false), 3000);
  };

  const handleApplyDiscount = () => {
    console.log(`Applying ${discountPercentage}% discount to product ${productIdDiscount}`);
    setProductIdDiscount('');
    setDiscountPercentage('');
    setDiscountSuccess(true);
    setTimeout(() => setDiscountSuccess(false), 3000);
  };

  const handleSendNotifications = () => {
    console.log(`Sending wishlist notifications for product ${productIdNotification}`);
    setProductIdNotification('');
    setNotificationSuccess(true);
    setTimeout(() => setNotificationSuccess(false), 3000);
  };

  const handleViewInvoices = () => {
    console.log(`Fetching invoices from ${startDateInv} to ${endDateInv}`);
    const mockInvoices = [
      { id: 'INV001', date: '2023-10-01', amount: 150.00, customer: 'Alice' },
      { id: 'INV002', date: '2023-10-05', amount: 200.50, customer: 'Bob' },
    ];
    setInvoices(mockInvoices);
    setViewingInvoices(true);
  };

  const handleExportInvoicesPDF = () => {
    console.log(`Exporting invoices from ${startDateInv} to ${endDateInv} to PDF`);
    alert('PDF export functionality to be implemented.');
  };

  const handleCalculateRevenueLoss = () => {
    console.log(`Calculating revenue/loss from ${startDateRev} to ${endDateRev} with ${defaultCostPercentage}% default cost.`);
    const mockReport = {
      totalRevenue: 5000,
      totalCost: parseFloat(defaultCostPercentage) / 100 * 5000,
      netProfit: 5000 - (parseFloat(defaultCostPercentage) / 100 * 5000),
      period: `${startDateRev} to ${endDateRev}`
    };
    setRevenueReport(mockReport);
  };

  return (
    <div className="sales-manager-page">
      <h1>Sales Manager Dashboard</h1>

      <div className="feature-section">
        <h2>💲 Set Product Price</h2>
        <div className="form-inline">
          <div className="form-group">
            <label htmlFor="productIdPrice">Product ID:</label>
            <input type="text" id="productIdPrice" value={productIdPrice} onChange={(e) => setProductIdPrice(e.target.value)} placeholder="Enter product ID" />
          </div>
          <div className="form-group">
            <label htmlFor="newPrice">New Price:</label>
            <input type="number" id="newPrice" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="Enter new price" step="0.01" />
          </div>
        </div>
        <button onClick={handleSetPrice} className="action-button">Set Price</button>
        {priceSuccess && <div className="success-message">✅ Price updated successfully!</div>}
      </div>

      <div className="feature-section">
        <h2>🎯 Apply Discount</h2>
        <div className="form-inline">
          <div className="form-group">
            <label htmlFor="productIdDiscount">Product ID:</label>
            <input type="text" id="productIdDiscount" value={productIdDiscount} onChange={(e) => setProductIdDiscount(e.target.value)} placeholder="Enter product ID" />
          </div>
          <div className="form-group">
            <label htmlFor="discountPercentage">Discount Percentage (%):</label>
            <input type="number" id="discountPercentage" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} placeholder="Enter discount % (e.g., 10)" step="1" min="0" max="100" />
          </div>
        </div>
        <button onClick={handleApplyDiscount} className="action-button">Apply Discount</button>
        {discountSuccess && <div className="success-message">✅ Discount applied successfully!</div>}
      </div>

      <div className="feature-section">
        <h2>🗣️ Notify Wishlist Users</h2>
        <div className="form-group">
          <label htmlFor="productIdNotification">Product ID:</label>
          <input type="text" id="productIdNotification" value={productIdNotification} onChange={(e) => setProductIdNotification(e.target.value)} placeholder="Enter product ID for notifications" />
        </div>
        <button onClick={handleSendNotifications} className="action-button">Send Notifications</button>
        {notificationSuccess && <div className="success-message">✅ Notifications sent successfully!</div>}
      </div>

    </div>
  );
};

export default SalesManagerPage;
