const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const authorizeRoles = require("./middleware/roleMiddleware");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/orders", orderRoutes);




dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(cors());
app.use(express.json());
app.get("/api/auth/me", protect, (req, res) => {
  res.json(req.user);
});
app.get(
  "/api/admin",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);



app.get("/", (req, res) => {
  res.send("Order Tracking API Running");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));
