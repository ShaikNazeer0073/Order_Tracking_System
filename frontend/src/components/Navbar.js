import React from "react";

import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const isAdmin = user?.role === "admin";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">OrderTrack</Link>

        <nav className="links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>

          {!token ? (
            <>
              <Link className="btn ghost" to="/login">Login</Link>
              <Link className="btn primary" to="/register">Sign Up</Link>
            </>
          ) : (
            <>
              {!isAdmin ? (
                <>
                  <Link className="btn ghost" to="/my-orders">My Orders</Link>
                  <Link className="btn primary" to="/create-order">Create Order</Link>
                  <Link className="btn ghost" to="/track-order">Track</Link>
                </>
              ) : (
                <Link className="btn primary" to="/admin">Admin Panel</Link>
              )}

              <button className="btn danger" onClick={logout}>Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
