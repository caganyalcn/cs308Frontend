import React, { useState, useEffect, useContext } from 'react'; // Added useContext
import '../styles/SalesManagerPage.css';
import { FaDollarSign, FaPercent, FaClipboardList, FaFileInvoice, FaChartBar } from 'react-icons/fa';
import { AppContext } from '../AppContext'; // Added AppContext import

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

const SECTION_KEYS = [
  'setPrice',
  'discount',
  'priceApproval',
  'invoice',
  'revenue',
];

const SalesManagerPage = () => {
  const { fetchProducts } = useContext(AppContext); // Get fetchProducts from context
  const [productIdPrice, setProductIdPrice] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [productIdDiscount, setProductIdDiscount] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [startDateInv, setStartDateInv] = useState('');
  const [endDateInv, setEndDateInv] = useState('');
  const [invoices, setInvoices] = useState([]);
  const [viewingInvoices, setViewingInvoices] = useState(false);
  const [startDateRev, setStartDateRev] = useState('');
  const [endDateRev, setEndDateRev] = useState('');
  const [revenueReport, setRevenueReport] = useState(null);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [error, setError] = useState(null);

  const [priceSuccess, setPriceSuccess] = useState(false);
  const [discountSuccess, setDiscountSuccess] = useState(false);

  const [openSections, setOpenSections] = useState([]);

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const fetchPendingProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/products/null-price/`, {
        credentials: 'include', // Added credentials
      });
      if (!response.ok) throw new Error('Failed to fetch pending products');
      const responseData = await response.json(); // Renamed data to responseData
      // Access the products array from the responseData object
      const productsArray = responseData.products;
      // Ensure productsArray is an array before setting state
      setPendingProducts(Array.isArray(productsArray) ? productsArray : []);
      setError(null);
    } catch (err) {
      setError('Error fetching pending products');
      setPendingProducts([]); // Also set to empty array on error
    }
  };

  const handleSetPrice = async () => {
    if (!productIdPrice || newPrice === '') {
      alert('Please enter both product ID and new price.');
      return;
    }
    if (parseFloat(newPrice) < 0) {
      alert('Price cannot be negative.');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/products/update_price/${productIdPrice}/`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: newPrice }), 
      });
      if (!response.ok) throw new Error('Failed to update price');
      setPriceSuccess(true);
      fetchProducts(); // Call fetchProducts to refresh product list in AppContext
      fetchPendingProducts(); // Refresh the list of products with null prices
      setTimeout(() => setPriceSuccess(false), 3000);
      setProductIdPrice('');
      setNewPrice('');
    } catch (err) {
      alert('Error updating price');
    }
  };

  const handleApplyDiscount = async () => { // Make function async
    if (!productIdDiscount || discountPercentage === '') {
      alert('Please enter both product ID and discount percentage.');
      return;
    }
    if (parseFloat(discountPercentage) < 0) {
      alert('Discount percentage cannot be negative.');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/products/${productIdDiscount}/discount/`, { // Updated endpoint
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discount_percentage: parseFloat(discountPercentage) }), 
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to apply discount' }));
        throw new Error(errorData.message || 'Failed to apply discount');
      }
      setDiscountSuccess(true);
      fetchProducts(); // Call fetchProducts to refresh product list in AppContext
      setTimeout(() => setDiscountSuccess(false), 3000);
      setProductIdDiscount('');
      setDiscountPercentage('');
    } catch (err) {
      alert(`Error applying discount: ${err.message}`);
    }
  };

  const handleShowInvoices = async () => {
    if (!startDateInv || !endDateInv) {
      setError('Please select both start and end dates');
      return;
    }
    
    try {
      setError(null); // Clear any previous errors
      const response = await fetch(`${API_BASE_URL}/api/orders/by-date-range/?start_date=${startDateInv}&end_date=${endDateInv}`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Invoice fetch error:', errorText);
        throw new Error(`Failed to fetch invoices (${response.status})`);
      }
      
      const data = await response.json();
      console.log('Invoice data received:', data); // Debug log to see the structure
      
      // Handle different possible response structures
      const ordersArray = data.orders || data || [];
      setInvoices(Array.isArray(ordersArray) ? ordersArray : []);
      setViewingInvoices(true);
    } catch (err) {
      console.error('Error in handleShowInvoices:', err);
      setError(`Error fetching invoices: ${err.message}`);
      setInvoices([]);
      setViewingInvoices(false);
    }
  };

  const handlePrintInvoices = () => {
    alert('Print functionality to be implemented.');
    // Later, you can implement window.print() or a library for better print formatting.
  };

  const handleExportInvoicesPDF = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/sales/invoices/export-pdf?start_date=${startDateInv}&end_date=${endDateInv}`);
      if (!response.ok) throw new Error('Failed to export PDF');
      // For file download, you may need to handle blob response here
      alert('PDF export functionality to be implemented.');
    } catch (err) {
      setError('Error exporting PDF');
    }
  };

  const handleCalculateRevenueLoss = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/calculate-revenue/?start_date=${startDateRev}&end_date=${endDateRev}`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch revenue');
      const data = await response.json();
      
      // Calculate expense as half of the revenue
      const revenue = typeof data === 'number' ? data : 0;
      const expense = revenue / 2;
      
      setRevenueReport({
        revenue: revenue,
        expense: expense
      });
      
      setError(null);
    } catch (err) {
      setError('Error fetching revenue');
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
      {/* Price Approval for New Products */}
      <div className={`feature-section${openSections.includes('priceApproval') ? ' expanded' : ''}`}>
        <button className="icon-header" onClick={() => toggleSection('priceApproval')}><FaClipboardList size={28} /></button>
        {openSections.includes('priceApproval') && (
          <div className="feature-content">
            <h2>📋 Products with Null Prices</h2>
            <p>Products with null prices are listed here.</p>
            {error && <div className="error-message">{error}</div>}
            <div className="pending-products-list">
              {pendingProducts.length === 0 ? (
                <div>No products with null prices found.</div>
              ) : (
                pendingProducts.map(product => (
                  <div key={product.id} className="pending-product-item">
                    <span>{product.name} (ID: {product.id})</span>
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
            <button onClick={handleShowInvoices} className="action-button">Show</button>
            <button onClick={handlePrintInvoices} className="action-button">Print</button>
            <button onClick={handleExportInvoicesPDF} className="action-button">Download as PDF</button>
            {error && <div className="error-message">{error}</div>}
            {viewingInvoices && (
              <div className="invoices-list">
                {invoices.length === 0 ? (
                  <div>No invoices found for the selected period.</div>
                ) : (
                  invoices.map(invoice => (
                    <div key={invoice.id || Math.random()} className="invoice-item">
                      <h3>Order ID: {invoice.id || 'N/A'}</h3>
                      <p>User Email: {invoice.user_email || 'N/A'}</p>
                      <p>Created At: {invoice.created_at ? new Date(invoice.created_at).toLocaleString() : 'N/A'}</p>
                      <p>Total Price: ${invoice.total_price ? invoice.total_price.toFixed(2) : '0.00'}</p>
                      <p>Delivery Address: {invoice.delivery_address || 'N/A'}</p>
                      <p>Status: {invoice.status || 'N/A'}</p>
                      <h4>Items:</h4>
                      {invoice.items && Array.isArray(invoice.items) && invoice.items.length > 0 ? (
                        <ul>
                          {invoice.items.map(item => (
                            <li key={item.product_id || Math.random()}>
                              {item.product_name || 'Unknown Product'} 
                              {item.product_id ? `(ID: ${item.product_id})` : ''} - 
                              Quantity: {item.quantity || 0} - 
                              Price: ${item.price_at_purchase ? item.price_at_purchase.toFixed(2) : '0.00'}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No items in this order.</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {/* Revenue Calculation */}
      <div className={`feature-section${openSections.includes('revenue') ? ' expanded' : ''}`}>
        <button className="icon-header" onClick={() => toggleSection('revenue')}><FaChartBar size={28} /></button>
        {openSections.includes('revenue') && (
          <div className="feature-content">
            <h2>📊 Revenue Calculation</h2>
            <div className="form-inline">
              <div className="form-group">
                <label htmlFor="startDateRev">Start Date:</label>
                <input type="date" id="startDateRev" value={startDateRev} onChange={(e) => setStartDateRev(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="endDateRev">End Date:</label>
                <input type="date" id="endDateRev" value={endDateRev} onChange={(e) => setEndDateRev(e.target.value)} />
              </div>
            </div>
            <button onClick={handleCalculateRevenueLoss} className="action-button">Calculate Revenue</button>
            {revenueReport && (
              <div className="revenue-report">
                <h3>Revenue Report</h3>
                
                <div className="revenue-item">
                  <div className="revenue-label">Toplam Kazanç:</div>
                  <div className="revenue-value">${revenueReport.revenue.toFixed(2)}</div>
                  <div className="revenue-bar-container">
                    <div 
                      className="revenue-bar" 
                      style={{ 
                        width: `100%`, 
                        backgroundColor: '#4CAF50'
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="revenue-item">
                  <div className="revenue-label">Toplam Gider:</div>
                  <div className="revenue-value">${revenueReport.expense.toFixed(2)}</div>
                  <div className="revenue-bar-container">
                    <div 
                      className="revenue-bar" 
                      style={{ 
                        width: `${(revenueReport.expense / revenueReport.revenue) * 100}%`, 
                        backgroundColor: '#f44336'
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="revenue-item">
                  <div className="revenue-label">Net Kazanç:</div>
                  <div className="revenue-value">${(revenueReport.revenue - revenueReport.expense).toFixed(2)}</div>
                </div>
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