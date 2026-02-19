import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Navbar from "../components/Navbar";


function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [editId, setEditId] = useState(null);
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    const res = await fetch("http://localhost:5000/api/orders/my", {
      headers: { Authorization: "Bearer " + token },
    });
    const data = await res.json();
    if (Array.isArray(data)) setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  const handlePay = async (id) => {
    const res = await fetch(`http://localhost:5000/api/orders/pay/${id}`, {
      method: "PUT",
      headers: { Authorization: "Bearer " + token },
    });
    if (res.ok) fetchOrders();
  };

  const startEdit = (o) => {
    setEditId(o._id);
    setProductName(o.productName);
    setQuantity(o.quantity);
  };

  const saveEdit = async () => {
    const res = await fetch(`http://localhost:5000/api/orders/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ productName, quantity }),
    });
    if (res.ok) {
      setEditId(null);
      fetchOrders();
    }
  };

  const deleteOrder = async (id) => {
    const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });
    if (res.ok) fetchOrders();
  };

  const copyId = async (id) => {
    await navigator.clipboard.writeText(id);
    alert("✅ Order ID copied!");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>My Orders 🧾</h1>
      </div>

      <div className="orders-section">
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((o) => (
            <div key={o._id} className="order-card">
              <h4>{o.productName}</h4>

              {/* ✅ SHOW ORDER ID */}
              <p>
                <strong>Order ID:</strong> {o._id}{" "}
                <button
                  style={{
                    marginLeft: 8,
                    padding: "4px 10px",
                    borderRadius: 8,
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => copyId(o._id)}
                >
                  Copy 📋
                </button>
              </p>

              <p>Qty: {o.quantity}</p>
              <p>Status: {o.status}</p>
              <p>Payment: {o.paymentStatus}</p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {!o.isPaid && (
                  <button onClick={() => handlePay(o._id)}>Pay Now 💳</button>
                )}
                <button onClick={() => startEdit(o)}>Edit ✏️</button>
                <button onClick={() => deleteOrder(o._id)}>Delete 🗑️</button>
              </div>
            </div>
          ))
        )}
      </div>

      {editId && (
        <div className="create-order-card">
          <h3>Edit Order</h3>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={saveEdit}>Save ✅</button>
            <button onClick={() => setEditId(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyOrders;
