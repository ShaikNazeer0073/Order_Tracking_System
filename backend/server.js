const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");


dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(cors());
app.use(express.json());

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
