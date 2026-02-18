const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// User routes
router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);

// Admin route
router.get("/", protect, authorizeRoles("admin"), getAllOrders);

// Payment route
router.put("/pay/:id", protect, async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }

  order.isPaid = true;
  order.paymentStatus = "Paid";
  order.paidAt = Date.now();

  await order.save();

  res.json({ message: "Payment successful", order });
});

module.exports = router;
