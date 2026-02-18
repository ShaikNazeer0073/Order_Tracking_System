const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  deliveryDays: {
    type: Number,
    default: 7
  },
  defaultStatus: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered"],
    default: "Pending"
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Settings", settingsSchema);
