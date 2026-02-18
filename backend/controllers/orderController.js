const Order = require("../models/Order");

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const { productName, quantity } = req.body;

    const order = await Order.create({
      productName,
      quantity,
      user: req.user.id,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get My Orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get All Orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
