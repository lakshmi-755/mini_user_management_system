
// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();


// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: "*"
}));
app.use(express.json());
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);
const adminRoutes = require("./routes/admin.routes");
app.use("/api/admin", adminRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = app;

