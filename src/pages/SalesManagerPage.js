import React, { useState, useEffect } from 'react';
import '../styles/SalesManagerPage.css';
import { FaDollarSign, FaPercent, FaBell, FaClipboardList, FaFileInvoice, FaChartBar } from 'react-icons/fa';

const SECTION_KEYS = [
  'setPrice',
  'discount',
  'notify',
  'priceApproval',
  'invoice',
  'revenue',
];

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
  const [defaultCostPercentage] = useState('50');
  const [revenueReport, setRevenueReport] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [pendingPrice, setPendingPrice] = useState({});
  const [error, setError] = useState(null);

  const [priceSuccess, setPriceSuccess] = useState(false);
  const [discountSuccess, setDiscountSuccess] = useState(false);
  const [notificationSuccess, setNotificationSuccess] = useState(false);
  const [priceApprovalSuccess, setPriceApprovalSuccess] = useState(false);

  const [openSections, setOpenSections] = useState([]);

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const fetchPendingProducts = async () => {
    try {
      const response = await fetch('/api/sales-admin/pending-products/');
      if (!response.ok) throw new Error('Failed to fetch pending products');
      const data = await response.json();
      setPendingProducts(data);
      setError(null);
    } catch (err) {
      setError('Error fetching pending products');
    }
  };

  const handleApprovePrice = async (productId) => {
    try {
      const response = await fetch('/api/sales-admin/products/set-price/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, new_price: pendingPrice[productId] }),
      });
      if (!response.ok) throw new Error('Failed to set price');
      setPriceApprovalSuccess(true);
      setTimeout(() => setPriceApprovalSuccess(false), 3000);
      fetchPendingProducts();
    } catch (err) {
      setError('Error setting price');
    }
  };

  const handlePendingPriceChange = (productId, value) => {
    setPendingPrice((prev) => ({ ...prev, [productId]: value }));
  };

  const handleSetPrice = () => {
    if (!productIdPrice || newPrice === '') {
      alert('Please enter both product ID and new price.');
      return;
    }
    if (parseFloat(newPrice) < 0) {
      alert('Price cannot be negative.');
      return;
    }
    console.log(`Setting price for product ${productIdPrice} to ${newPrice}`);
    setProductIdPrice('');
    setNewPrice('');
    setPriceSuccess(true);
    setTimeout(() => setPriceSuccess(false), 3000);
  };

  const handleApplyDiscount = () => {
    if (!productIdDiscount || discountPercentage === '') {
      alert('Please enter both product ID and discount percentage.');
      return;
    }
    if (parseFloat(discountPercentage) < 0) {
      alert('Discount percentage cannot be negative.');
      return;
    }
    console.log(`Applying ${discountPercentage}% discount to product ${productIdDiscount}`);
    setProductIdDiscount('');
    setDiscountPercentage('');
    setDiscountSuccess(true);
    setTimeout(() => setDiscountSuccess(false), 3000);
  };

  const handleSendNotifications = () => {
    if (!productIdNotification) {
      alert('Please enter product ID to notify users.');
      return;
    }
    console.log(`Sending wishlist notifications for product ${productIdNotification}`);
    setProductIdNotification('');
    setNotificationSuccess(true);
    setTimeout(() => setNotificationSuccess(false), 3000);
  };

  const handleViewInvoices = async () => {
    try {
      const response = await fetch(`/api/sales-admin/invoices?start_date=${startDateInv}&end_date=${endDateInv}`);
      if (!response.ok) throw new Error('Failed to fetch invoices');
      const data = await response.json();
      setInvoices(data);
      setViewingInvoices(true);
      setError(null);
    } catch (err) {
      setError('Error fetching invoices');
    }
  };

  const handleExportInvoicesPDF = async () => {
    try {
      const response = await fetch(`/api/sales-admin/invoices/export-pdf?start_date=${startDateInv}&end_date=${endDateInv}`);
      if (!response.ok) throw new Error('Failed to export PDF');
      // For file download, you may need to handle blob response here
      alert('PDF export functionality to be implemented.');
    } catch (err) {
      setError('Error exporting PDF');
    }
  };

  const handleCalculateRevenueLoss = async () => {
    try {
      const response = await fetch(`/api/sales-admin/revenue-loss?start_date=${startDateRev}&end_date=${endDateRev}&default_cost_percentage=${defaultCostPercentage}`);
      if (!response.ok) throw new Error('Failed to fetch revenue/loss');
      const data = await response.json();
      setRevenueReport(data);
      setShowChart(true);
      setError(null);
    } catch (err) {
      setError('Error fetching revenue/loss');
    }
  };

  const toggleSection = (key) => {
    setOpenSections((prev) =>
      prev.includes(key)
        ? prev.filter((section) => section !== key)
        : [...prev, key]
    );
  };

  return (
    <div className="sales-manager-page">
      <h1>Sales Manager Dashboard</h1>
      {/* Set Product Price */}
      <div className={`feature-section${openSections.includes('setPrice') ? ' expanded' : ''}`}>
        <button className="icon-header" onClick={() => toggleSection('setPrice')}><FaDollarSign size={28} /></button>
        {openSections.includes('setPrice') && (
          <div className="feature-content">
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
        )}
      </div>
      {/* Apply Discount */}
      <div className={`feature-section${openSections.includes('discount') ? ' expanded' : ''}`}>
        <button className="icon-header" onClick={() => toggleSection('discount')}><FaPercent size={28} /></button>
        {openSections.includes('discount') && (
          <div className="feature-content">
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
        )}
      </div>
      {/* Notify Wishlist Users */}
      <div className={`feature-section${openSections.includes('notify') ? ' expanded' : ''}`}>
        <button className="icon-header" onClick={() => toggleSection('notify')}><FaBell size={28} /></button>
        {openSections.includes('notify') && (
          <div className="feature-content">
            <div className="form-group">
              <label htmlFor="productIdNotification">Product ID:</label>
              <input type="text" id="productIdNotification" value={productIdNotification} onChange={(e) => setProductIdNotification(e.target.value)} placeholder="Enter product ID for notifications" />
            </div>
            <button onClick={handleSendNotifications} className="action-button">Send Notifications</button>
            {notificationSuccess && <div className="success-message">✅ Notifications sent successfully!</div>}
          </div>
        )}
      </div>
      {/* Price Approval for New Products */}
      <div className={`feature-section${openSections.includes('priceApproval') ? ' expanded' : ''}`}>
        <button className="icon-header" onClick={() => toggleSection('priceApproval')}><FaClipboardList size={28} /></button>
        {openSections.includes('priceApproval') && (
          <div className="feature-content">
            <h2>📋 Price Approval for New Products</h2>
            <p>Products pending price approval will be listed here. Set their prices to make them visible.</p>
            {priceApprovalSuccess && <div className="success-message">✅ Price approved successfully!</div>}
            {error && <div className="error-message">{error}</div>}
            <div className="pending-products-list">
              {pendingProducts.length === 0 ? (
                <div>No products pending price approval.</div>
              ) : (
                pendingProducts.map(product => (
                  <div key={product.id} className="pending-product-item">
                    <span>{product.name} (ID: {product.id})</span>
                    <input
                      type="number"
                      placeholder="Enter price"
                      value={pendingPrice[product.id] || ''}
                      onChange={e => handlePendingPriceChange(product.id, e.target.value)}
                    />
                    <button onClick={() => handleApprovePrice(product.id)}>Approve Price</button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      {/* Invoice Management */}
      <div className={`feature-section${openSections.includes('invoice') ? ' expanded' : ''}`}>
        <button className="icon-header" onClick={() => toggleSection('invoice')}><FaFileInvoice size={28} /></button>
        {openSections.includes('invoice') && (
          <div className="feature-content">
            <h2>📄 Invoice Management</h2>
            <div className="form-inline">
              <div className="form-group">
                <label htmlFor="startDateInv">Start Date:</label>
                <input type="date" id="startDateInv" value={startDateInv} onChange={(e) => setStartDateInv(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="endDateInv">End Date:</label>
                <input type="date" id="endDateInv" value={endDateInv} onChange={(e) => setEndDateInv(e.target.value)} />
              </div>
            </div>
            <button onClick={handleViewInvoices} className="action-button">View Invoices</button>
            <button onClick={handleExportInvoicesPDF} className="action-button">Export as PDF</button>
            {viewingInvoices && (
              <div className="invoices-list">
                {invoices.length === 0 ? (
                  <div>No invoices found for the selected period.</div>
                ) : (
                  invoices.map(invoice => (
                    <div key={invoice.id} className="invoice-item">
                      <span>Invoice ID: {invoice.id}</span>
                      <span>Date: {invoice.date}</span>
                      <span>Amount: ${invoice.amount}</span>
                      <span>Customer: {invoice.customer}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {/* Revenue/Loss Calculation */}
      <div className={`feature-section${openSections.includes('revenue') ? ' expanded' : ''}`}>
        <button className="icon-header" onClick={() => toggleSection('revenue')}><FaChartBar size={28} /></button>
        {openSections.includes('revenue') && (
          <div className="feature-content">
            <h2>📊 Revenue/Loss Calculation</h2>
            <div className="form-inline">
              <div className="form-group">
                <label htmlFor="startDateRev">Start Date:</label>
                <input type="date" id="startDateRev" value={startDateRev} onChange={(e) => setStartDateRev(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="endDateRev">End Date:</label>
                <input type="date" id="endDateRev" value={endDateRev} onChange={(e) => setEndDateRev(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="defaultCostPercentage">Default Cost Percentage (%):</label>
                <input type="number" id="defaultCostPercentage" value={defaultCostPercentage} readOnly />
              </div>
            </div>
            <button onClick={handleCalculateRevenueLoss} className="action-button">Calculate Revenue/Loss</button>
            {revenueReport && (
              <div className="revenue-report">
                <h3>Revenue Report for {revenueReport.period}</h3>
                <p>Total Revenue: ${revenueReport.totalRevenue}</p>
                <p>Total Cost: ${revenueReport.totalCost}</p>
                <p>Net Profit: ${revenueReport.netProfit}</p>
                {showChart && <div className="chart-placeholder">Chart will be displayed here.</div>}
              </div>
            )}
            {error && <div className="error-message">{error}</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesManagerPage;
