import React, { useState } from "react";
import "./Contact.css";
import axios from "axios";
import Navbar from "../components/Navbar";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/messages", formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <>
      <Navbar />
      <div className="contact-page">
        <div className="contact-header">
          <h1>Get In <span className="gradient-text">Touch</span></h1>
          <p>Have a question or feedback? We'd love to hear from you.</p>
        </div>

        <div className="contact-card">
          {status === "success" && (
            <div className="contact-alert success">✅ Message sent successfully!</div>
          )}
          {status === "error" && (
            <div className="contact-alert error">❌ Error sending message. Try again.</div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Tell us what's on your mind..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="contact-submit">
              Send Message
              <span>→</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
