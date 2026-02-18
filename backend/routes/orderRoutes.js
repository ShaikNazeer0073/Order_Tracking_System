const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getAllOrders,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// User routes
router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);

// Admin route
router.get("/", protect, authorizeRoles("admin"), getAllOrders);

module.exports = router;
