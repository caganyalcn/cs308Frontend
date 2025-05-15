// src/pages/CommentManagementPage.js
import React, { useState } from "react";

const CommentManagementPage = () => {
  // --- Mock başlangıç yorumları ---
  const [comments, setComments] = useState([
    {
      id: 201,
      productId: 1,
      productName: "Organik Yumurta",
      customer: "C-010",
      text: "Harika lezzet, taze ve doğal 👍",
      approved: false,
    },
    {
      id: 202,
      productId: 2,
      productName: "Organik Süt",
      customer: "C-011",
      text: "Biraz fazla soğuktu teslimatta.",
      approved: false,
    },
    {
      id: 203,
      productId: 3,
      productName: "Organik Peynir",
      customer: "C-012",
      text: "Peynir çok iyiydi, teşekkürler!",
      approved: true,
    },
  ]);
  // -------------------------------------

  const handleApprove = (id) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, approved: true } : c))
    );
    // TODO: fetch PUT /api/reviews/<id> { approved: true }
  };

  const handleReject = (id) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
    // TODO: fetch DELETE /api/reviews/<id>  veya approved: false
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Yorum Moderasyonu
      </h2>

      <div className="space-y-4">
        {comments.map((c) => (
          <div
            key={c.id}
            className="bg-white border rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-700">
                  #{c.id} - {c.productName} (Ürün ID: {c.productId})
                </p>
                <p className="text-gray-600 text-sm">Müşteri: {c.customer}</p>
              </div>
              <div>
                {c.approved ? (
                  <span className="text-green-600 font-semibold">Onaylandı</span>
                ) : (
                  <span className="text-red-600 font-semibold">Beklemede</span>
                )}
              </div>
            </div>
            <p className="mt-2 text-gray-800 italic">“{c.text}”</p>

            {!c.approved && (
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => handleApprove(c.id)}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Onayla
                </button>
                <button
                  onClick={() => handleReject(c.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Reddet
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentManagementPage;
