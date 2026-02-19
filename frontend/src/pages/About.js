import React from "react";
import "./About.css";
import Navbar from "../components/Navbar";

function About() {
  return (
    <>
      <Navbar />
      <div className="about-page">
        <div className="about-hero">
          <h1>About <span className="highlight">BuzzTrack</span></h1>
          <p>
            We built BuzzTrack because tracking orders shouldn't be complicated.
            Our goal is simple — give you a clear, honest view of where your
            stuff is, every step of the way.
          </p>
        </div>

        <div className="about-stats">
          <div className="about-stat">
            <span className="about-stat-number">500+</span>
            <span className="about-stat-label">Orders Handled</span>
          </div>
          <div className="about-stat">
            <span className="about-stat-number">100%</span>
            <span className="about-stat-label">Delivered on Time</span>
          </div>
          <div className="about-stat">
            <span className="about-stat-number">24/7</span>
            <span className="about-stat-label">Live Tracking</span>
          </div>
        </div>

        <div className="about-cards">
          <div className="about-card">
            <div className="about-card-icon">⚡</div>
            <h3>Fast</h3>
            <p>Real-time updates so you're never left guessing.</p>
          </div>

          <div className="about-card">
            <div className="about-card-icon">🔒</div>
            <h3>Secure</h3>
            <p>Your data stays safe with encrypted, password-protected accounts.</p>
          </div>

          <div className="about-card">
            <div className="about-card-icon">🌍</div>
            <h3>Reliable</h3>
            <p>Built on solid tech that doesn't let you down.</p>
          </div>
        </div>

        <div className="about-tech">
          <h2>Built With</h2>
          <div className="tech-pills">
            <span className="tech-pill">React</span>
            <span className="tech-pill">Node.js</span>
            <span className="tech-pill">Express</span>
            <span className="tech-pill">MongoDB</span>
            <span className="tech-pill">JWT Auth</span>
            <span className="tech-pill">Chart.js</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
