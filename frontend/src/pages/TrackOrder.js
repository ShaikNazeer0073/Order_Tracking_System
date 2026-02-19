import React, { useState } from "react";
import "./TrackOrder.css";

function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [tracking, setTracking] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchTracking = async (e) => {
    e.preventDefault();
    setError("");
    setTracking([]);
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/orders/track/${orderId}`, {
        headers: { Authorization: "Bearer " + token },
      });

      const data = await res.json();

      if (res.ok) {
        const steps = (data.tracking || []).slice().reverse(); // latest first
        setTracking(steps);
      } else {
        setError(data.message || "Tracking not found");
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (d) => {
    const dt = new Date(d);
    return dt.toLocaleString();
  };

  return (
    <div className="track-wrap">
      <h1>Track Order 🚚</h1>
      <p className="sub">Paste your Order ID to see live tracking updates.</p>

      <form className="track-form" onSubmit={fetchTracking}>
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value.trim())}
          placeholder="Enter Order ID (example: 6995...)"
          required
        />
        <button type="submit">{loading ? "Tracking..." : "Track"}</button>
      </form>

      {error && <p className="err">{error}</p>}

      {tracking.length > 0 && (
        <div className="timeline-card">
          {tracking.map((t, idx) => (
            <div key={t._id || idx} className={`timeline-row ${idx === 0 ? "active" : ""}`}>
              <div className="time">{formatTime(t.time || t.updatedAt)}</div>

              <div className="line">
                <div className={`dot ${idx === 0 ? "dot-active" : ""}`}></div>
                {idx !== tracking.length - 1 && <div className="stem"></div>}
              </div>

              <div className="text">
                <div className={`status ${idx === 0 ? "status-active" : ""}`}>
                  {t.status}
                </div>
                <div className="note">
                  {t.note
                    ? t.note
                    : t.status === "Pending"
                    ? "Order placed successfully."
                    : t.status === "Shipped"
                    ? "Your parcel is on the way to the next location."
                    : t.status === "Delivered"
                    ? "Delivered successfully."
                    : "Tracking update received."}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TrackOrder;
