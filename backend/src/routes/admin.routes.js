
const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");

const router = express.Router();

// Get all users (admin only)
router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
});


// Deactivate user
router.patch(
  "/users/:id/deactivate",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        status: false
      });

      res.status(200).json({
        message: "User deactivated successfully"
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error"
      });
    }
  }
);



// Activate user
router.patch(
  "/users/:id/activate",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        status: true
      });

      res.status(200).json({
        message: "User activated successfully"
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error"
      });
    }
  }
);

module.exports = router;
