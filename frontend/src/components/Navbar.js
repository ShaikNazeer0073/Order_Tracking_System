import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-emoji">🐝</span>
          <span className="logo-text">Buzz<span className="logo-accent">Track</span></span>
        </Link>

        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/about" onClick={closeMenu}>About</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>

          {token && user?.role !== "admin" && (
            <>
              <Link to="/my-orders" onClick={closeMenu}>My Orders</Link>
              <Link to="/create-order" onClick={closeMenu}>New Order</Link>
              <Link to="/track-order" onClick={closeMenu}>Track</Link>
            </>
          )}

          {token && user?.role === "admin" && (
            <Link to="/admin" onClick={closeMenu}>Dashboard</Link>
          )}

          <div className="nav-auth">
            {!token ? (
              <>
                <Link className="nav-btn ghost" to="/login" onClick={closeMenu}>Login</Link>
                <Link className="nav-btn primary" to="/register" onClick={closeMenu}>Sign Up</Link>
              </>
            ) : (
              <button className="nav-btn logout" onClick={() => { logout(); closeMenu(); }}>
                Logout
              </button>
            )}
          </div>
        </nav>
      </div>

      {menuOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
    </header>
  );
}

export default Navbar;
