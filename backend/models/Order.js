const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered"],
      default: "Pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },paymentStatus: {
  type: String,
  default: "Pending"
},
isPaid: {
  type: Boolean,
  default: false
},
paidAt: Date

    
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
