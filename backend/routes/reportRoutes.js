const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { protect, admin } = require("../middleware/authMiddleware");


router.get("/summary", protect, admin, async (req, res) => {
  const totalOrders = await Order.countDocuments();

  const paidOrders = await Order.countDocuments({ isPaid: true });

  const pendingOrders = await Order.countDocuments({ status: "Pending" });

  const deliveredOrders = await Order.countDocuments({ status: "Delivered" });

  res.json({
    totalOrders,
    paidOrders,
    pendingOrders,
    deliveredOrders
  });
});

module.exports = router;
