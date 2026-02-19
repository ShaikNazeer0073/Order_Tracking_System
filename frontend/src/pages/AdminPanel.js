import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "./AdminPanel.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function AdminPanel() {

  const token = localStorage.getItem("token");
  const headers = useMemo(() => ({ Authorization: "Bearer " + token }), [token]);

  const [tab, setTab] = useState("overview");

  const [summary, setSummary] = useState(null);
  const [trends, setTrends] = useState(null);

  const [unread, setUnread] = useState(0);
  const [messages, setMessages] = useState([]);

  const [orders, setOrders] = useState([]);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [payFilter, setPayFilter] = useState("ALL");

  const fetchSummary = async () => {
    const res = await axios.get("http://localhost:5000/api/reports/summary", { headers });
    setSummary(res.data);
  };

  const fetchTrends = async () => {
    const res = await axios.get("http://localhost:5000/api/reports/trends", { headers });
    setTrends(res.data);
  };

  const fetchUnread = async () => {
    const res = await axios.get("http://localhost:5000/api/messages/unread-count", { headers });
    setUnread(res.data?.unread || 0);
  };

  const fetchMessages = async () => {
    const res = await axios.get("http://localhost:5000/api/messages", { headers });
    setMessages(res.data || []);
  };

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:5000/api/orders", { headers });
    setOrders(res.data || []);
  };

  // ✅ auto refresh trends (graph updates when users create orders)
  useEffect(() => {
    fetchSummary();
    fetchTrends();
    fetchUnread();
    fetchOrders();

    const t = setInterval(() => {
      fetchTrends();
      fetchSummary();
      fetchUnread();
    }, 15000); // every 15 sec

    return () => clearInterval(t);
    // eslint-disable-next-line
  }, []);

  const markRead = async (id) => {
    await axios.patch(`http://localhost:5000/api/messages/${id}/read`, {}, { headers });
    fetchUnread();
    fetchMessages();
  };

  const updateOrderStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/orders/track/${id}`,
      { status },
      { headers }
    );
    fetchOrders();
    fetchTrends();
    fetchSummary();
  };

  const exportCSV = () => {
    const rows = [
      ["OrderId", "Product", "Qty", "Status", "Paid", "UserEmail", "CreatedAt"],
      ...orders.map((o) => [
        o._id,
        o.productName,
        o.quantity,
        o.status,
        o.isPaid ? "Yes" : "No",
        o.user?.email || "",
        new Date(o.createdAt).toLocaleString(),
      ]),
    ];

    const csv = rows.map((r) => r.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredOrders = orders.filter((o) => {
    const text = `${o._id} ${o.productName} ${o.user?.email || ""}`.toLowerCase();
    const matchQ = text.includes(q.toLowerCase());

    const matchStatus = statusFilter === "ALL" ? true : o.status === statusFilter;
    const matchPay =
      payFilter === "ALL"
        ? true
        : payFilter === "PAID"
          ? o.isPaid === true
          : o.isPaid === false;

    return matchQ && matchStatus && matchPay;
  });

  const barData = trends
    ? {
      labels: trends.last7.map((x) => x.label),
      datasets: [
        {
          label: "Orders (Last 7 Days)",
          data: trends.last7.map((x) => x.count),
          backgroundColor: "rgba(251, 191, 36, 0.6)",
          borderColor: "#fbbf24",
          borderWidth: 2,
          borderRadius: 6,
        },
      ],
    }
    : null;

  const lineData = trends
    ? {
      labels: trends.monthly.map((x) => x.label),
      datasets: [
        {
          label: "Orders (Last 12 Months)",
          data: trends.monthly.map((x) => x.count),
          borderColor: "#f59e0b",
          backgroundColor: "rgba(245, 158, 11, 0.12)",
          tension: 0.35,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: "#f59e0b",
        },
      ],
    }
    : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#b0b0b0", font: { weight: 600 } },
      },
    },
    scales: {
      x: {
        ticks: { color: "#737373", font: { size: 12 } },
        grid: { color: "rgba(255,255,255,0.04)" },
      },
      y: {
        ticks: { color: "#737373", font: { size: 12 } },
        grid: { color: "rgba(255,255,255,0.04)" },
      },
    },
  };


  return (
    <>
      <Navbar />

      <div className="admin-wrap">
        <div className="admin-top">
          <h1>Admin Dashboard 🛠️</h1>

          <div className="admin-tabs">
            <button className={tab === "overview" ? "active" : ""} onClick={() => setTab("overview")}>Overview</button>
            <button className={tab === "orders" ? "active" : ""} onClick={() => setTab("orders")}>Orders</button>
            <button className={tab === "messages" ? "active" : ""} onClick={() => { setTab("messages"); fetchMessages(); }}>
              Messages 🔔 {unread > 0 ? `(${unread})` : ""}
            </button>
          </div>

          <button className="refresh" onClick={() => { fetchSummary(); fetchTrends(); fetchOrders(); fetchUnread(); }}>
            Refresh ↻
          </button>
        </div>

        {tab === "overview" && (
          <>
            <div className="cards">
              <div className="card"><p>Total Orders</p><h2>{summary?.totalOrders ?? "—"}</h2></div>
              <div className="card"><p>Paid Orders</p><h2>{summary?.paidOrders ?? "—"}</h2></div>
              <div className="card"><p>Pending</p><h2>{summary?.pendingOrders ?? "—"}</h2></div>
              <div className="card"><p>Delivered</p><h2>{summary?.deliveredOrders ?? "—"}</h2></div>
              <div className="card"><p>Today’s Orders</p><h2>{trends?.todayOrders ?? "—"}</h2></div>
            </div>

            <div className="graphs">
              <div className="graph-card">
                <h3>Last 7 Days 📊</h3>
                {barData ? <Bar data={barData} /> : <p>Loading…</p>}
              </div>

              <div className="graph-card">
                <h3>Last 12 Months 📈</h3>
                {lineData ? <Line data={lineData} /> : <p>Loading…</p>}
              </div>
            </div>
          </>
        )}

        {tab === "orders" && (
          <div className="orders-panel">
            <div className="orders-actions">
              <input
                placeholder="Search by Order ID / Product / User email..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />

              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="ALL">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>

              <select value={payFilter} onChange={(e) => setPayFilter(e.target.value)}>
                <option value="ALL">All Payments</option>
                <option value="PAID">Paid</option>
                <option value="UNPAID">Unpaid</option>
              </select>

              <button className="csv" onClick={exportCSV}>Export CSV ⬇️</button>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>User</th>
                    <th>Paid</th>
                    <th>Status</th>
                    <th>Update</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.map((o) => (
                    <tr key={o._id}>
                      <td className="mono">{o._id}</td>
                      <td>{o.productName}</td>
                      <td>{o.quantity}</td>
                      <td>{o.user?.email || "-"}</td>
                      <td>{o.isPaid ? "✅" : "❌"}</td>
                      <td>{o.status}</td>
                      <td>
                        <select
                          defaultValue={o.status}
                          onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}

                  {filteredOrders.length === 0 && (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center", padding: 18 }}>
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "messages" && (
          <div className="msg-panel">
            {messages.length === 0 ? (
              <p>No messages yet</p>
            ) : (
              messages.map((m) => (
                <div className={`msg-card ${m.isRead ? "read" : "unread"}`} key={m._id}>
                  <div className="msg-top">
                    <div>
                      <b>{m.name}</b> <span className="muted">({m.email})</span>
                    </div>
                    <div className="muted">{new Date(m.createdAt).toLocaleString()}</div>
                  </div>

                  <p className="msg-text">{m.message}</p>

                  {!m.isRead && (
                    <button className="mark" onClick={() => markRead(m._id)}>
                      Mark as Read ✅
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default AdminPanel;
