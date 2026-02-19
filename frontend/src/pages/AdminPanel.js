import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPanel.css";

function AdminPanel() {
  const [messages, setMessages] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await axios.get("http://localhost:5000/api/messages");
    setMessages(res.data);
  };

  return (
    <div className="admin">
      <div className="admin-header">
        <h1>Admin Panel</h1>

        <div className="notification">
          <span
            className="bell"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            🔔
          </span>
          <span className="badge">{messages.length}</span>

          {showDropdown && (
            <div className="dropdown">
              {messages.length === 0 ? (
                <p>No messages</p>
              ) : (
                messages.map((msg) => (
                  <div key={msg._id} className="dropdown-item">
                    <strong>{msg.name}</strong>
                    <p>{msg.message}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
