import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import Register from "./pages/Register";

import CreateOrder from "./pages/CreateOrder";
import MyOrders from "./pages/MyOrders";
import TrackOrder from "./pages/TrackOrder";

import AdminPanel from "./pages/AdminPanel";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  );

  const syncAuth = () => {
    setToken(localStorage.getItem("token"));
    const u = localStorage.getItem("user");
    setUser(u ? JSON.parse(u) : null);
  };

  useEffect(() => {
    syncAuth();
    window.addEventListener("authChange", syncAuth);
    return () => window.removeEventListener("authChange", syncAuth);
  }, []);

  const isAdmin = user?.role === "admin";

  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User protected */}
        <Route
          path="/create-order"
          element={token ? <CreateOrder /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-orders"
          element={token ? <MyOrders /> : <Navigate to="/login" />}
        />
        <Route
          path="/track-order"
          element={token ? <TrackOrder /> : <Navigate to="/login" />}
        />

        {/* Admin protected */}
        <Route
          path="/admin"
          element={token && isAdmin ? <AdminPanel /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
