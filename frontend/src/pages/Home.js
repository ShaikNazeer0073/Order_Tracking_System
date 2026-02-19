import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <header className="header">
        <h2 className="logo">OrderTrack</h2>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/register" className="login-btn">Sign Up</Link>

        </nav>
      </header>

      <div className="hero">
        <h1>Track Your Orders</h1>
        <p>Fast. Secure. Reliable.</p>

        <div className="hero-buttons">
          <Link to="/dashboard" className="btn primary">
            Create Order
          </Link>
          <Link to="/dashboard" className="btn secondary">
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
