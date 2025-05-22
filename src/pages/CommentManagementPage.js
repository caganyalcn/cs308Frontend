import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes, FaStar } from "react-icons/fa";
import "../styles/CommentManagementPage.css";

const API = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

const CommentManagementPage = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/api/reviews/all/`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (response.status === 401) {
        // Handle unauthorized - maybe redirect to login or show a message
        setError('Authentication required to view comments.');
        setLoading(false);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || 'Yorumlar yüklenemedi';
        throw new Error(errorMessage);
      }

      const data = await response.json();
      // Assuming the backend returns an object with a 'reviews' key containing an array
      if (Array.isArray(data.reviews)) {
         setComments(data.reviews);
         setError(null);
      } else {
         console.error('API response for comments is not an array:', data);
         setError('Yorum listesi beklenmedik formatta geldi.');
         setComments([]);
      }
     
    } catch (err) {
      setError('Yorumlar yüklenirken bir hata oluştu: ' + err.message);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`${API}/api/reviews/${id}/update-approval/`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_approved: true })
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.error || 'Onaylama başarısız');
      }

      // Refresh comments after approval
      fetchComments();

    } catch (err) {
      setError('Yorum onaylanırken bir hata oluştu: ' + err.message);
    }
  };

  const handleReject = async (id) => {
     try {
      const response = await fetch(`${API}/api/reviews/${id}/update-approval/`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_approved: false })
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.error || 'Reddetme başarısız');
      }

      // Refresh comments after rejection
      fetchComments();

    } catch (err) {
      setError('Yorum reddedilirken bir hata oluştu: ' + err.message);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} color="#ffc107" />);
    }
    // You can add half or empty stars if needed
    return stars;
  };

  const getCommentStatus = (comment) => {
    if (comment.comment && comment.comment.includes('This comment is rejected')) {
      return 'rejected';
    }
    return comment.approved ? 'approved' : 'pending';
  };

  if (loading) {
    return (
       <div className="comment-management-container">
          <h2 className="comment-management-title">Yorum Yönetimi</h2>
          <p>Yükleniyor...</p>
        </div>
    );
  }

  return (
    <div className="comment-management-container">
      <h2 className="comment-management-title">Yorum Yönetimi</h2>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="comments-list">
        {comments.length === 0 ? (
            <p>Henüz yorum yok.</p>
        ) : (
            comments.map((comment) => {
              const status = getCommentStatus(comment);
              return (
                <div key={comment.id} className={`comment-card ${status}`}>
                  <div className="comment-details-section">
                    <div className="comment-product-info">
                      <span className="comment-id">#{comment.id}</span>
                      <span className="product-name">{comment.product_name || 'Ürün Bilgisi Yok'}</span>
                      <span className="product-id">(Ürün ID: {comment.product_id || 'Yok'})</span>
                    </div>
                    <div className="comment-customer-info">
                      <span className="customer-name">Müşteri: {comment.customer_name || 'Bilinmiyor'}</span>
                      <span className="comment-date">• {comment.created_at ? new Date(comment.created_at).toLocaleDateString("tr-TR") : 'Tarih Bilgisi Yok'}</span>
                    </div>
                     {comment.rating !== null && comment.rating !== undefined && ( // Only show rating if it exists
                       <div className="comment-rating">
                      {renderStars(comment.rating)}
                          <span className="rating-value">({comment.rating}/5)</span>
                  </div>
                    )}
                </div>

                  <div className="comment-text-section">
                    <p className="comment-text">"{comment.comment || 'Yorum Yok'}"</p>
                </div>

                  <div className="comment-actions-section">
                    <span className={`status-badge ${status}`}>
                      {status === 'rejected' ? 'Reddedildi' : status === 'approved' ? 'Onaylı' : 'Beklemede'}
                    </span>

                    {status !== 'rejected' && comment.comment && (
                      <>
                    <button
                      onClick={() => handleReject(comment.id)}
                          className="reject-button"
                    >
                      Reddet
                    </button>
                        {status === 'pending' && (
                    <button
                      onClick={() => handleApprove(comment.id)}
                            className="approve-button"
                    >
                      Onayla
                    </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })
                )}
      </div>
    </div>
  );
};

export default CommentManagementPage;
