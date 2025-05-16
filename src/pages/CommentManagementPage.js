import React, { useState } from "react";
import { FaCheck, FaTimes, FaStar } from "react-icons/fa";
import "../styles/CommentManagementPage.css";

const CommentManagementPage = () => {
  const [comments, setComments] = useState([
    {
      id: 201,
      productId: 1,
      productName: "Organik Yumurta",
      customer: "C-010",
      text: "Harika lezzet, taze ve doğal 👍",
      approved: false,
      rating: 5,
      date: "2024-03-15"
    },
    {
      id: 202,
      productId: 2,
      productName: "Organik Süt",
      customer: "C-011",
      text: "Biraz fazla soğuktu teslimatta.",
      approved: false,
      rating: 3,
      date: "2024-03-14"
    },
    {
      id: 203,
      productId: 3,
      productName: "Organik Peynir",
      customer: "C-012",
      text: "Peynir çok iyiydi, teşekkürler!",
      approved: true,
      rating: 5,
      date: "2024-03-13"
    },
  ]);

  const handleApprove = (id) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, approved: true } : c))
    );
  };

  const handleReject = (id) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Yorum Moderasyonu
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Kullanıcı yorumlarını onaylayın veya reddedin
          </p>
        </div>

        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <div className="p-6">
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-gray-500">#{comment.id}</span>
                      <span className="text-lg font-semibold text-gray-900">{comment.productName}</span>
                      <span className="text-sm text-gray-500">(Ürün ID: {comment.productId})</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                      <span>Müşteri: {comment.customer}</span>
                      <span>• {new Date(comment.date).toLocaleDateString("tr-TR")}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {renderStars(comment.rating)}
                      <span className="text-sm text-gray-600 ml-2">
                        ({comment.rating}/5)
                      </span>
                    </div>
                  </div>

                  <div>
                    {comment.approved ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <FaCheck className="w-4 h-4 mr-1" />
                        Onaylandı
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        <FaTimes className="w-4 h-4 mr-1" />
                        Beklemede
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-gray-700 italic border-l-4 border-blue-500 pl-4 py-2">
                    "{comment.text}"
                  </p>
                </div>

                {!comment.approved && (
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={() => handleReject(comment.id)}
                      className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                    >
                      <FaTimes className="w-4 h-4 mr-2" />
                      Reddet
                    </button>
                    <button
                      onClick={() => handleApprove(comment.id)}
                      className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                    >
                      <FaCheck className="w-4 h-4 mr-2" />
                      Onayla
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentManagementPage;
