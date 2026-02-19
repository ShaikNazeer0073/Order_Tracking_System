import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

function CreateOrder() {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [msg, setMsg] = useState("");

  const createOrder = async (e) => {
    e.preventDefault();
    setMsg("");
    setCreatedOrder(null);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ productName, quantity }),
      });

      const data = await res.json();

      if (res.ok) {
        setProductName("");
        setQuantity(1);
        setCreatedOrder(data);
        setMsg("✅ Order created successfully!");
      } else {
        setMsg(data.message || "❌ Failed to create order");
      }
    } catch (err) {
      setMsg("❌ Server error");
    }
  };

  const copyId = async () => {
    if (!createdOrder?._id) return;
    await navigator.clipboard.writeText(createdOrder._id);
    setMsg("✅ Order ID copied!");
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Create Order 📦</h1>
        </div>

        <div className="create-order-card">
          <h3>New Order</h3>
          {msg && <p>{msg}</p>}

          <form onSubmit={createOrder}>
            <input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />

            <button type="submit">Create Order</button>
          </form>

          {createdOrder && (
            <div style={{ marginTop: 16 }}>
              <p>
                <strong>Order ID:</strong> {createdOrder._id}
              </p>
              <button onClick={copyId}>Copy Order ID 📋</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CreateOrder;
