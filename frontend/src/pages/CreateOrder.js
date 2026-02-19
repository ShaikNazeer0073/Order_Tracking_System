import React, { useState } from "react";
import "./Dashboard.css"; // reuse your existing styles

function CreateOrder() {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [msg, setMsg] = useState("");

  const createOrder = async (e) => {
    e.preventDefault();
    setMsg("");

    const token = localStorage.getItem("token");
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
      setMsg("✅ Order created!");
    } else {
      setMsg(data.message || "❌ Failed");
    }
  };

  return (
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
      </div>
    </div>
  );
}

export default CreateOrder;
