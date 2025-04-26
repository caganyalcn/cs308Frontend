import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AdminDashboard.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

// Configure axios defaults
axios.defaults.withCredentials = true;

const AdminDashboardPage = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Debounced search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchDashboardData();
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // Fetch on filter change
    useEffect(() => {
        fetchDashboardData();
    }, [statusFilter, dateFilter, minPrice, maxPrice, currentPage]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                search: searchQuery,
                status: statusFilter,
                date_range: dateFilter,
                page: currentPage,
                per_page: 10
            });

            if (minPrice) params.append('min_price', minPrice);
            if (maxPrice) params.append('max_price', maxPrice);

            const response = await axios.get(`${API_BASE_URL}/api/accounts/admin/dashboard/?${params}`, {
                withCredentials: true
            });
            setDashboardData(response.data.dashboard_data);
        } catch (error) {
            console.error('Dashboard error:', error);
            if (error.response?.status === 401 || error.response?.status === 403) {
                navigate('/login');
            } else {
                setError('Failed to fetch dashboard data');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleApproveReview = async (reviewId) => {
        try {
            await axios.post(`${API_BASE_URL}/api/accounts/admin/approve-review/${reviewId}/`, {}, {
                withCredentials: true
            });
            fetchDashboardData();
        } catch (error) {
            console.error('Approve review error:', error);
            if (error.response?.status === 401 || error.response?.status === 403) {
                navigate('/login');
            } else {
                setError('Failed to approve review');
            }
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (loading && !dashboardData) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            
            {/* Filter Section */}
            <div className="filters-section">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by order ID, customer, or product..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                
                <div className="filter-controls">
                    <select 
                        value={statusFilter} 
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Statuses</option>
                        <option value="processing">Processing</option>
                        <option value="in-transit">In Transit</option>
                        <option value="delivered">Delivered</option>
                    </select>

                    <select 
                        value={dateFilter} 
                        onChange={(e) => setDateFilter(e.target.value)}
                    >
                        <option value="">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">Last 7 Days</option>
                        <option value="month">Last 30 Days</option>
                    </select>

                    <div className="price-filters">
                        <input
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="stats-container">
                <div className="stat-card">
                    <h3>Total Users</h3>
                    <p>{dashboardData.total_users}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Products</h3>
                    <p>{dashboardData.total_products}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Orders</h3>
                    <p>{dashboardData.total_orders}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Reviews</h3>
                    <p>{dashboardData.total_reviews}</p>
                </div>
            </div>

            <div className="recent-orders">
                <h2>Orders ({dashboardData.total_filtered_orders} results)</h2>
                <div className="orders-list">
                    {dashboardData.recent_orders.map(order => (
                        <div key={order.id} className="order-card">
                            <div className="order-header">
                                <h3>Order #{order.id}</h3>
                                <span className={`status-badge ${order.status}`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="order-details">
                                <p><strong>Customer:</strong> {order.user_name} ({order.user_email})</p>
                                <p><strong>Date:</strong> {order.created_at}</p>
                                <p><strong>Total:</strong> ${order.total_price}</p>
                                <p><strong>Address:</strong> {order.delivery_address}</p>
                            </div>
                            <div className="order-items">
                                <h4>Items:</h4>
                                <ul>
                                    {order.items.map((item, index) => (
                                        <li key={index}>
                                            {item.product_name} x{item.quantity} (${item.price_at_purchase} each)
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {dashboardData.total_pages > 1 && (
                    <div className="pagination">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>Page {currentPage} of {dashboardData.total_pages}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === dashboardData.total_pages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            <div className="pending-reviews">
                <h2>Pending Reviews</h2>
                <div className="reviews-list">
                    {dashboardData.pending_reviews.map(review => (
                        <div key={review.id} className="review-card">
                            <p><strong>Product:</strong> {review.product_name}</p>
                            <p><strong>Customer:</strong> {review.user_email}</p>
                            <p><strong>Rating:</strong> {review.rating}⭐</p>
                            <p><strong>Comment:</strong> {review.comment}</p>
                            <button 
                                onClick={() => handleApproveReview(review.id)}
                                className="approve-button"
                            >
                                Approve Review
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage; 