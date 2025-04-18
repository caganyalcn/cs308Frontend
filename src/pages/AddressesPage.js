// src/pages/AddressesPage.js
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../styles/AccountPage.css";

const API = process.env.REACT_APP_API_BASE_URL || "";

const AddressesPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading]     = useState(true);

  const [title,   setTitle]   = useState("");
  const [line1,   setLine1]   = useState("");
  const [city,    setCity]    = useState("");
  const [zip,     setZip]     = useState("");

  /* ------- get addresses ------- */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/api/addresses`, {
          credentials: "include",
        });
        if (res.ok) setAddresses(await res.json());
      } catch (_) {/* backend yok */}
      setLoading(false);
    })();
  }, []);

  /* ------- add address ------- */
  const addAddress = async (e) => {
    e.preventDefault();
    if (!title || !line1 || !city || !zip) return;

    const payload = { title, line1, city, zip };
    try {
      const res = await fetch(`${API}/api/addresses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (res.ok) payload.id = (await res.json()).id;
    } catch (_) { payload.id = Date.now(); }
    setAddresses([...addresses, payload]);

    setTitle(""); setLine1(""); setCity(""); setZip("");
  };

  /* ------- delete address ------- */
  const delAddress = async (id) => {
    try {
      await fetch(`${API}/api/addresses/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
    } catch (_) {/* backend yok */}
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  return (
    <div className="account-page">
      <Header />
      <div className="account-container">
        <section className="account-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: "1rem" }}>Adreslerim</h1>

          {loading ? (
            <p>Yükleniyor…</p>
          ) : addresses.length ? (
            <ul className="addr-list">
              {addresses.map((a) => (
                <li key={a.id}>
                  <div className="addr-info">
                    <strong>{a.title}</strong><br />
                    {a.line1}<br />
                    {a.city}, {a.zip}
                  </div>
                  <button className="delete-btn" onClick={() => delAddress(a.id)}>
                    Sil
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Henüz kayıtlı adresiniz yok.</p>
          )}

          <form onSubmit={addAddress} className="addr-form">
            <h3>Yeni Adres Ekle</h3>
            <input
              placeholder="Adres Başlığı (Örn: Ev, Ofis)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              placeholder="Adres Satırı"
              value={line1}
              onChange={(e) => setLine1(e.target.value)}
              required
            />
            <input
              placeholder="Şehir"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <input
              placeholder="Posta Kodu"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              pattern="\d{4,6}"
              title="4‑6 haneli posta kodu"
              required
            />
            <button type="submit" className="add-btn">Kaydet</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AddressesPage;
