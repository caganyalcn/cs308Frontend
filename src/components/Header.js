// src/components/Header.js
import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "./Logo.png";
import "../styles/Header.css";
import { FaShoppingBasket, FaHeart, FaSort } from "react-icons/fa";
import { AppContext } from "../AppContext";
import AuthButtons from "./AuthButtons";

const API = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

/*
 * Props:
 *   setSearchQuery       – arama metnini HomePage'e iletmek
 *   setSelectedCategory  – kategori filtresini HomePage'e iletmek
 *   onSortChange(option) – "priceAsc" | "priceDesc" | "popular"
 */
const Header = ({
  setSearchQuery,
  setSelectedCategory,
  onSortChange = () => {},
}) => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { isAuthenticated } = useContext(AppContext);

  /* ——— local state ——— */
  const [searchTerm,  setSearchTerm]  = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSort,    setShowSort]    = useState(false);
  const [categories,  setCategories]  = useState([]);
  const [isLoading,   setIsLoading]   = useState(true);

  /* dropdown'u kapatmak için dış tıklama yakala */
  const sortRef = useRef(null);
  useEffect(() => {
    const outside = (e) =>
      sortRef.current && !sortRef.current.contains(e.target) && setShowSort(false);

    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, []);

  /* ——— fetch categories ——— */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API}/api/products/categories/`, {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Categories response:', data); // Debug log
        
        if (data && data.categories && Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          console.error('API response for categories is not in expected format:', data);
          setCategories([]);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  /* ——— search ——— */
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchQuery(e.target.value);
  };
  const handleSearch = () => {
    setSearchQuery(searchTerm);
    navigate("/home");
  };

  /* ——— categories ——— */
  const handleCategoryClick = (cat) => {
    if (cat === "Tümü") {
      setSelectedCategory("");
    } else {
      setSelectedCategory(cat);
    }
    setShowSidebar(false);
  };

  /* ——— sort ——— */
  const sortOptions = [
    { id: "priceAsc",  label: "Fiyat (Artan)" },
    { id: "priceDesc", label: "Fiyat (Azalan)" },
    { id: "popular",   label: "En Çok Değerlendirilen" },
  ];
  const handleSortSelect = (id) => {
    onSortChange(id);
    setShowSort(false);
  };

  /* ——— JSX ——— */
  return (
    <div className="header-container">
      {/* geri */}
      {location.pathname !== "/home" && location.pathname !== "/admin" && (
        <button
          className="back-button"
          onClick={() =>
            location.pathname === "/return" ? navigate("/orders") : navigate("/home")
          }
        >
          ←
        </button>
      )}

      {/* logo */}
      <div className="logo-container" onClick={() => navigate("/home")}>
        <img src={logo} alt="Çiftlikbank Logo" className="logo" />
        <h1>Çiftlik Bank</h1>
      </div>

      {/* kategori toggle */}
      {location.pathname === "/home" && (
        <button
          className="category-toggle-button"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          ☰
        </button>
      )}

      {/* kategori sidebar */}
      {location.pathname === "/home" && showSidebar && (
        <div className="category-sidebar">
          <h3 className="sidebar-title">Kategoriler</h3>
          <ul>
            <li onClick={() => handleCategoryClick("Tümü")}>Tümü</li>
            {isLoading ? (
              <li>Yükleniyor...</li>
            ) : (
              categories.map((cat) => (
                <li key={cat.id} onClick={() => handleCategoryClick(cat.id)}>
                  {cat.name}
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {/* search */}
      {location.pathname !== "/admin" && (
        <div className="search-container">
          <input
            className="search-input"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Ürün ara..."
          />
          <button className="search-button" onClick={handleSearch}>
            Ara
          </button>
        </div>
      )}

      {/* sırala – click toggled */}
      {location.pathname === "/home" && (
        <div className="sort-wrapper" ref={sortRef}>
          <button
            className="sort-button"
            onClick={() => setShowSort((s) => !s)}
          >
            <FaSort className="nav-icon" /> Sırala
          </button>

          {showSort && (
            <ul className="sort-dropdown">
              {sortOptions.map((opt) => (
                <li key={opt.id} onClick={() => handleSortSelect(opt.id)}>
                  {opt.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* sağ menü */}
      <div className="header-right">
        {location.pathname !== "/admin" && (
          <>
            <button onClick={() => navigate("/favorites")} className="favorites-button">
              <FaHeart className="nav-icon" /> Favorilerim
            </button>
            <button onClick={() => navigate("/cart")} className="cart-button">
              <FaShoppingBasket className="nav-icon" /> Sepetim
            </button>
          </>
        )}
        <AuthButtons />
      </div>
    </div>
  );
};

export default Header;
