import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/orders/my", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = await res.json();
    if (Array.isArray(data)) {
      setOrders(data);
    }
  };

  const createOrder = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        productName,
        quantity,
      }),
    });

    if (res.ok) {
      setProductName("");
      setQuantity(1);
      fetchOrders();
    }
  };

  const handlePay = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/orders/pay/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (res.ok) {
      fetchOrders();
    }
  };

  // ✅ FIXED LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard 📦</h1>
        <button onClick={logout}>Logout</button>
      </div>

      {/* CREATE ORDER FORM */}
      <div className="create-order-card">
        <h3>Create New Order</h3>
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
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          <button type="submit">Create Order</button>
        </form>
      </div>

      {/* ORDERS LIST */}
      <div className="orders-section">
        <h3>Your Orders</h3>

        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order-card">
              <h4>{order.productName}</h4>
              <p>Quantity: {order.quantity}</p>
              <p>Status: {order.status}</p>
              <p>Payment: {order.paymentStatus}</p>

              {!order.isPaid && (
                <button onClick={() => handlePay(order._id)}>
                  Pay Now 💳
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
