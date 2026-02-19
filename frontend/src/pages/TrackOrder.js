import React, { useState } from "react";
import "./TrackOrder.css";

function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [tracking, setTracking] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchTracking = async (e) => {
    e.preventDefault();
    setError("");
    setTracking([]);

    const res = await fetch(`http://localhost:5000/api/orders/track/${orderId}`, {
      headers: { Authorization: "Bearer " + token },
    });

    const data = await res.json();
    if (res.ok) {
      setTracking(data.tracking || []);
    } else {
      setError(data.message || "Tracking not found");
    }
  };

  return (
    <div className="track-wrap">
      <h1>Track Order 🚚</h1>

      <form className="track-form" onSubmit={fetchTracking}>
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter Order ID"
          required
        />
        <button type="submit">Track</button>
      </form>

      {error && <p className="err">{error}</p>}

      {tracking.length > 0 && (
        <div className="timeline">
          {tracking.map((t) => (
            <div className="step" key={t._id}>
              <div className="dot"></div>
              <div className="content">
                <h3>{t.status}</h3>
                <p>{new Date(t.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TrackOrder;
