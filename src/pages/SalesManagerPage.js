import React, { useState } from 'react';
import '../styles/SalesManagerPage.css'; 

const SalesManagerPage = () => {
  // State for Set Product Price section
  const [productIdPrice, setProductIdPrice] = useState('');
  const [newPrice, setNewPrice] = useState('');

  // State for Apply Discount section
  const [productIdDiscount, setProductIdDiscount] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');

  // State for Wishlist Notification section
  const [productIdNotification, setProductIdNotification] = useState('');

  // State for Invoice Viewer section
  const [startDateInv, setStartDateInv] = useState('');
  const [endDateInv, setEndDateInv] = useState('');
  const [invoices, setInvoices] = useState([]); // To hold fetched invoices
  const [viewingInvoices, setViewingInvoices] = useState(false); // To control display

  // State for Revenue/Loss Calculation section
  const [startDateRev, setStartDateRev] = useState('');
  const [endDateRev, setEndDateRev] = useState('');
  const [defaultCostPercentage, setDefaultCostPercentage] = useState('60'); // Default to 60%
  const [revenueReport, setRevenueReport] = useState(null);

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

  const handleSendNotifications = () => {
    // Placeholder for backend API call
    console.log(`Sending wishlist notifications for product ${productIdNotification}`);
    alert(`Sent wishlist notifications for product ${productIdNotification}`);
    setProductIdNotification('');
  };

  const handleViewInvoices = () => {
    // Placeholder for backend API call to fetch invoices based on date range
    console.log(`Fetching invoices from ${startDateInv} to ${endDateInv}`);
    // Mock data for now:
    const mockInvoices = [
      { id: 'INV001', date: '2023-10-01', amount: 150.00, customer: 'Alice' },
      { id: 'INV002', date: '2023-10-05', amount: 200.50, customer: 'Bob' },
    ];
    setInvoices(mockInvoices);
    setViewingInvoices(true);
    // alert(`Invoices from ${startDateInv} to ${endDateInv} would be displayed here.`);
  };

  const handleExportInvoicesPDF = () => {
    // Placeholder for PDF export functionality
    console.log(`Exporting invoices from ${startDateInv} to ${endDateInv} to PDF`);
    alert('PDF export functionality to be implemented.');
  };

  const handleCalculateRevenueLoss = () => {
    // Placeholder for backend API call
    console.log(`Calculating revenue/loss from ${startDateRev} to ${endDateRev} with ${defaultCostPercentage}% default cost.`);
    // Mock data for now:
    const mockReport = {
      totalRevenue: 5000,
      totalCost: parseFloat(defaultCostPercentage) / 100 * 5000,
      netProfit: 5000 - (parseFloat(defaultCostPercentage) / 100 * 5000),
      period: `${startDateRev} to ${endDateRev}`
    };
    setRevenueReport(mockReport);
    // alert(`Revenue/Loss report for ${startDateRev} to ${endDateRev} would be displayed here.`);
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

      <div className="feature-section">
        <h2>Notify Wishlist Users</h2>
        <div className="form-group">
          <label htmlFor="productIdNotification">Product ID:</label>
          <input 
            type="text" 
            id="productIdNotification"
            value={productIdNotification}
            onChange={(e) => setProductIdNotification(e.target.value)}
            placeholder="Enter product ID for notifications"
          />
        </div>
        <button onClick={handleSendNotifications} className="action-button">
          Send Notifications
        </button>
      </div>

      <div className="feature-section">
        <h2>View Invoices</h2>
        <div className="form-group">
          <label htmlFor="startDateInv">Start Date:</label>
          <input 
            type="date" 
            id="startDateInv"
            value={startDateInv}
            onChange={(e) => setStartDateInv(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDateInv">End Date:</label>
          <input 
            type="date" 
            id="endDateInv"
            value={endDateInv}
            onChange={(e) => setEndDateInv(e.target.value)}
          />
        </div>
        <button onClick={handleViewInvoices} className="action-button" style={{marginRight: '10px'}}>
          View Invoices
        </button>
        {viewingInvoices && invoices.length > 0 && (
          <button onClick={handleExportInvoicesPDF} className="action-button">
            Export to PDF
          </button>
        )}

        {viewingInvoices && (
          <div className="invoice-list" style={{marginTop: '20px'}}>
            <h3>Invoices ({startDateInv} to {endDateInv})</h3>
            {invoices.length > 0 ? (
              <ul>
                {invoices.map(invoice => (
                  <li key={invoice.id} style={{borderBottom: '1px solid #eee', padding: '10px 0'}}>
                    ID: {invoice.id}, Date: {invoice.date}, Amount: ${invoice.amount.toFixed(2)}, Customer: {invoice.customer}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No invoices found for the selected date range.</p>
            )}
          </div>
        )}
      </div>

      <div className="feature-section">
        <h2>Revenue/Loss Calculation</h2>
        <div className="form-group">
          <label htmlFor="startDateRev">Start Date:</label>
          <input 
            type="date" 
            id="startDateRev"
            value={startDateRev}
            onChange={(e) => setStartDateRev(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDateRev">End Date:</label>
          <input 
            type="date" 
            id="endDateRev"
            value={endDateRev}
            onChange={(e) => setEndDateRev(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="defaultCostPercentage">Default Product Cost (%):</label>
          <input 
            type="number" 
            id="defaultCostPercentage"
            value={defaultCostPercentage}
            onChange={(e) => setDefaultCostPercentage(e.target.value)}
            placeholder="e.g., 60 for 60%"
            step="1"
            min="0"
            max="100"
          />
        </div>
        <button onClick={handleCalculateRevenueLoss} className="action-button">
          Calculate Revenue/Loss
        </button>

        {revenueReport && (
          <div className="revenue-report" style={{marginTop: '20px'}}>
            <h3>Revenue/Loss Report ({revenueReport.period})</h3>
            <p>Total Revenue: ${revenueReport.totalRevenue.toFixed(2)}</p>
            <p>Total Cost (at {defaultCostPercentage}%): ${revenueReport.totalCost.toFixed(2)}</p>
            <p style={{fontWeight: 'bold'}}>
              Net {revenueReport.netProfit >= 0 ? 'Profit' : 'Loss'}: 
              ${Math.abs(revenueReport.netProfit).toFixed(2)}
            </p>
            {/* Placeholder for chart */}
            <div style={{marginTop: '15px', padding: '10px', border: '1px dashed #ccc', textAlign: 'center'}}>
              Revenue/Loss Chart will be displayed here.
            </div>
          </div>
        )}
      </div>

      {/* More sections will be added here */}
    </div>
  );
};

export default SalesManagerPage; 