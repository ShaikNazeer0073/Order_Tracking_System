import React, { useState } from "react";
import "./Login.css";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setUser(true);
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to your Order Dashboard</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
