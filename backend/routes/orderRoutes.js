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
// Add tracking to an order (Admin only)
router.put(
  "/track/:id",
  protect,
  authorizeRoles("admin"),
  async (req, res) => {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Update status
    order.status = status;

    // Push to tracking history
    order.tracking.push({
      status,
      updatedBy: req.user.id
    });

    await order.save();
    res.json({ message: "Order tracking updated", order });
  }
);

// Get order tracking history (user or admin)
router.get(
  "/track/:id",
  protect,
  async (req, res) => {
    const order = await Order.findById(req.params.id).populate("tracking.updatedBy", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Check if user owns the order or is admin
    if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json({ tracking: order.tracking });
  }
);

module.exports = router;
