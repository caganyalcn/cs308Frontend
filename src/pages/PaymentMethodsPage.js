// src/pages/PaymentMethodsPage.js
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../styles/AccountPage.css";

const API = process.env.REACT_APP_API_BASE_URL || "";

const PaymentMethodsPage = () => {
  const [cards, setCards]     = useState([]);
  const [loading, setLoading] = useState(true);

  /* ------- form state ------- */
  const [cardName,   setCardName]   = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry,     setExpiry]     = useState("");
  const [cvc,        setCvc]        = useState("");

  /* ------- kartları çek ------- */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/api/payment-methods`, {
          credentials: "include",
        });
        if (res.ok) setCards(await res.json());
      } catch (_) { /* backend yoksa geç */ }
      setLoading(false);
    })();
  }, []);

  /* ------- kart ekle ------- */
  const addCard = async (e) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !cardHolder || !expiry || !cvc) return;

    const payload = { cardName, cardNumber, cardHolder, expiry, cvc };
    try {
      const res = await fetch(`${API}/api/payment-methods`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (res.ok) payload.id = (await res.json()).id;
    } catch (_) {
      payload.id = Date.now(); // backend yoksa mock id
    }
    setCards([...cards, payload]);

    /* form temizle */
    setCardName(""); setCardNumber(""); setCardHolder(""); setExpiry(""); setCvc("");
  };

  /* ------- kart sil ------- */
  const deleteCard = async (id) => {
    try {
      await fetch(`${API}/api/payment-methods/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
    } catch (_) { /* backend yoksa */ }
    setCards(cards.filter((c) => c.id !== id));
  };

  /* ======================================================= */
  return (
    <div className="account-page">
      <Header />
      <div className="account-container">
        <section className="account-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: "1rem" }}>Ödeme Yöntemlerim</h1>

          {loading ? (
            <p>Yükleniyor…</p>
          ) : cards.length ? (
            <ul className="card-list">
              {cards.map((c) => (
                <li key={c.id}>
                  <div>
                    <span className="card-name">{c.cardName}</span> –{" "}
                    <span className="card-number">
                      **** **** **** {c.cardNumber.slice(-4)}
                    </span>
                    <span className="card-expiry">{c.expiry}</span>
                  </div>
                  <button className="delete-btn" onClick={() => deleteCard(c.id)}>
                    Sil
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Henüz kayıtlı kartınız yok.</p>
          )}

          {/* ---------- Yeni kart formu ----------- */}
          <form onSubmit={addCard} className="card-form">
            <h3>Yeni Kart Ekle</h3>

            <input
              placeholder="Kart Başlığı (Örn: İş Kartı)"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              maxLength={30}
              required
            />

            <input
              placeholder="Kart Numarası (16 hane)"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
              maxLength={16}
              pattern="\d{16}"
              title="16 haneli sayı girin"
              required
            />

            <input
              placeholder="Kart Sahibi"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              required
            />

            <input
              placeholder="Son Kullanma (AA/YY)"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              pattern="^(0[1-9]|1[0-2])/[0-9]{2}$"
              title="AA/YY formatında girin (örn: 02/25)"
              required
            />

            <input
              placeholder="CVC (3 hane)"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
              maxLength={3}
              pattern="\d{3}"
              title="3 haneli güvenlik kodu"
              required
            />

            <button type="submit" className="add-btn">Kaydet</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default PaymentMethodsPage;
