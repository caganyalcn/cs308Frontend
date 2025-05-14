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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [invoices, setInvoices] = useState([]); // To hold fetched invoices
  const [viewingInvoices, setViewingInvoices] = useState(false); // To control display

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
    console.log(`Fetching invoices from ${startDate} to ${endDate}`);
    // Mock data for now:
    const mockInvoices = [
      { id: 'INV001', date: '2023-10-01', amount: 150.00, customer: 'Alice' },
      { id: 'INV002', date: '2023-10-05', amount: 200.50, customer: 'Bob' },
    ];
    setInvoices(mockInvoices);
    setViewingInvoices(true);
    // alert(`Invoices from ${startDate} to ${endDate} would be displayed here.`);
  };

  const handleExportInvoicesPDF = () => {
    // Placeholder for PDF export functionality
    console.log(`Exporting invoices from ${startDate} to ${endDate} to PDF`);
    alert('PDF export functionality to be implemented.');
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
          <label htmlFor="startDate">Start Date:</label>
          <input 
            type="date" 
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input 
            type="date" 
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
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
            <h3>Invoices ({startDate} to {endDate})</h3>
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

      {/* More sections will be added here */}
    </div>
  );
};

export default SalesManagerPage; 