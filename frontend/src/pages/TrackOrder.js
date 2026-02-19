import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./TrackOrder.css";

function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [tracking, setTracking] = useState([]);
  const [expectedDelivery, setExpectedDelivery] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchTracking = async (e) => {
    e.preventDefault();
    setError("");
    setTracking([]);
    setExpectedDelivery(null);
    setLoading(true);

    try {
      // ✅ if logged in -> protected route, else -> public route
      const url = token
        ? `http://localhost:5000/api/orders/track/${orderId}`
        : `http://localhost:5000/api/public/track/${orderId}`;

      const res = await fetch(url, {
        headers: token ? { Authorization: "Bearer " + token } : {},
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Tracking not found");
        setLoading(false);
        return;
      }

      // Public returns expectedDelivery, protected might not — handle both
      if (data.expectedDelivery) setExpectedDelivery(data.expectedDelivery);

      const steps = (data.tracking || []).slice().sort((a, b) => new Date(a.time) - new Date(b.time));
      setTracking(steps);
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (d) => new Date(d).toLocaleString();

  const now = new Date();

  return (
    <>
      <Navbar />
      <div className="track-wrap">
        <h1>Track Order 🚚</h1>
        <p className="sub">Paste your Order ID to see tracking updates.</p>

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

        {expectedDelivery && (
          <div className="eta">
            <strong>Expected Delivery:</strong> {new Date(expectedDelivery).toDateString()}
          </div>
        )}

        {tracking.length > 0 && (
          <div className="timeline-card">
            {tracking.map((t, idx) => {
              const isDone = new Date(t.time) <= now;
              const isActive =
                isDone &&
                (idx === tracking.length - 1 || new Date(tracking[idx + 1].time) > now);

              return (
                <div
                  key={t._id || idx}
                  className={`timeline-row fade-in ${isActive ? "active" : ""} ${isDone ? "done" : "pending"}`}
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <div className="time">{formatTime(t.time)}</div>

                  <div className="line">
                    <div className={`dot ${isActive ? "dot-active" : isDone ? "dot-done" : ""}`}></div>
                    {idx !== tracking.length - 1 && <div className={`stem ${isDone ? "stem-done" : ""}`}></div>}
                  </div>

                  <div className="text">
                    <div className={`status ${isActive ? "status-active" : ""}`}>{t.status}</div>
                    <div className="note">{t.note || "Tracking update received."}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default TrackOrder;
