import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-glow"></div>

        <div className="hero-content">
          <h1>
            Your orders,<br />
            <span className="highlight">always in sight.</span>
          </h1>
          <p>
            BuzzTrack makes it simple to create, manage, and follow your
            deliveries from start to finish. No fuss, just clarity.
          </p>

          <div className="hero-buttons">
            <Link to="/create-order" className="hero-btn primary">
              Place an Order →
            </Link>
            <Link to="/track-order" className="hero-btn secondary">
              Track My Order
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <div className="logo-strip">
        <p className="logo-strip-label">Works with your favourite stores</p>
        <div className="logo-track">
          {[
            "Amazon", "Flipkart", "Meesho", "Myntra", "Ajio",
            "Nykaa", "Snapdeal", "Tata CLiQ", "Shopify", "JioMart",
          ].map((name, i) => (
            <span key={i} className="logo-pill">{name}</span>
          ))}
          {[
            "Amazon", "Flipkart", "Meesho", "Myntra", "Ajio",
            "Nykaa", "Snapdeal", "Tata CLiQ", "Shopify", "JioMart",
          ].map((name, i) => (
            <span key={"r" + i} className="logo-pill">{name}</span>
          ))}
        </div>
      </div>

      {/* What we offer */}
      <section className="features">
        <h2>What makes BuzzTrack different?</h2>
        <p className="section-desc">
          Simple tools that help you stay on top of every order.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3>Live Tracking</h3>
            <p>
              Follow every step of your delivery — from packed to delivered,
              with real timestamps you can count on.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Safe & Secure</h3>
            <p>
              Your account is protected with industry-standard encryption.
              Only you see your orders.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Smart Dashboard</h3>
            <p>
              Admins get a bird's-eye view of everything — charts, filters,
              and one-click order management.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Quick Payments</h3>
            <p>
              Mark orders as paid with one click. UPI, wallets — whatever
              works for you.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how">
        <h2>It's as easy as 1-2-3</h2>

        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h4>Place your order</h4>
            <p>Tell us what you need — just a product name and quantity.</p>
          </div>

          <div className="step-connector"></div>

          <div className="step">
            <div className="step-number">2</div>
            <h4>Grab your tracking ID</h4>
            <p>You'll get a unique ID instantly. Copy it, save it.</p>
          </div>

          <div className="step-connector"></div>

          <div className="step">
            <div className="step-number">3</div>
            <h4>Watch it arrive</h4>
            <p>Check your timeline anytime to see exactly where it is.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to try BuzzTrack?</h2>
          <p>It's free. Create your account and place your first order today.</p>
          <Link to="/register" className="hero-btn primary">
            Get Started →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span>🐝</span>
            <span className="logo-text">Buzz<span className="highlight">Track</span></span>
          </div>
          <p className="footer-text">© 2026 BuzzTrack. Built with ❤️ and MERN.</p>
          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
