import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import Navbar from "../components/Navbar";


function Home() {
  const navigate = useNavigate();

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

  return (
    <div className="home">
      <header className="header">
        <h2 className="logo">OrderTrack</h2>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>

          {!token ? (
            <>
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/register" className="login-btn">Sign Up</Link>
            </>
          ) : (
            <>
              {user?.role === "admin" ? (
                <Link to="/admin" className="login-btn">Admin Panel</Link>
              ) : (
                <Link to="/my-orders" className="login-btn">My Orders</Link>
              )}

              <button className="login-btn" onClick={logout}>Logout</button>
            </>
          )}
        </nav>
      </header>

      <div className="hero">
        <h1>Track Your Orders</h1>
        <p>Fast. Secure. Reliable.</p>

        <div className="hero-buttons">
          {!token ? (
            <>
              <Link to="/register" className="btn primary">Create Order</Link>
              <Link to="/login" className="btn secondary">Track Order</Link>
            </>
          ) : user?.role === "admin" ? (
            <Link to="/admin" className="btn primary">Open Admin Panel</Link>
          ) : (
            <>
              <Link to="/create-order" className="btn primary">Create Order</Link>
              <Link to="/track-order" className="btn secondary">Track Order</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
