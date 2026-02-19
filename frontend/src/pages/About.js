import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about">
      <h1>About Us</h1>
      <p>
        OrderTrack is a modern order tracking system designed to provide
        fast, secure, and reliable shipment monitoring.
      </p>

      <div className="about-cards">
        <div className="card">
          <h3>🚀 Fast</h3>
          <p>Real-time updates on your shipments.</p>
        </div>

        <div className="card">
          <h3>🔒 Secure</h3>
          <p>Your data is encrypted and protected.</p>
        </div>

        <div className="card">
          <h3>🌍 Reliable</h3>
          <p>Trusted tracking infrastructure built for scale.</p>
        </div>
      </div>
    </div>
  );
}

export default About;
