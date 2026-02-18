const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reportRoutes = require("./routes/reportRoutes");
const settingsRoutes = require("./routes/settingsRoutes");


// Middleware
const { protect } = require("./middleware/authMiddleware");
const authorizeRoles = require("./middleware/roleMiddleware");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Auth routes
app.use("/api/auth", authRoutes);
app.get("/api/auth/me", protect, (req, res) => {
  res.json(req.user);
});

// Orders
app.use("/api/orders", orderRoutes);

// Reports
app.use("/api/reports", reportRoutes);
app.use("/api/settings", settingsRoutes);

// Admin test route
app.get("/api/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

// Root
app.get("/", (req, res) => {
  res.send("Order Tracking API Running");
});

// Connect to MongoDB & start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));
