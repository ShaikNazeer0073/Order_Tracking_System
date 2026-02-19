import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPanel.css";

function AdminPanel() {
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    try {
      setError("");
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/messages", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setMessages(res.data || []);
    } catch (err) {
      setMessages([]);
      setError("Only admin can view messages.");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="admin">
      <div className="admin-header">
        <h1>Admin Panel</h1>

        <div className="notification">
          <button className="bell-btn" onClick={() => setOpen(!open)}>
            🔔
            <span className="badge">{messages.length}</span>
          </button>

          {open && (
            <div className="dropdown">
              <div className="dropdown-head">
                <p className="dropdown-title">Messages</p>
                <button className="refresh-btn" onClick={fetchMessages}>
                  Refresh
                </button>
              </div>

              {error && <p className="dropdown-empty">{error}</p>}

              {!error && messages.length === 0 && (
                <p className="dropdown-empty">No messages yet</p>
              )}

              {!error &&
                messages.map((m) => (
                  <div key={m._id} className="dropdown-item">
                    <div className="msg-top">
                      <strong>{m.name}</strong>
                      <span className="msg-email">{m.email}</span>
                    </div>
                    <p className="msg-text">{m.message}</p>
                    <p className="msg-time">
                      {new Date(m.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      <div className="admin-body">
        <div className="admin-card">
          <h3>Manage Orders</h3>
          <p>Update order status & tracking.</p>
        </div>

        <div className="admin-card">
          <h3>Reports</h3>
          <p>View order summary and stats.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
