
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();

const authMiddleware = require("../middleware/auth");
// Signup route
router.post("/signup", async (req, res) => {
  try {
    // 1. Get data from request body
    const { fullName, email, password } = req.body;

    // 2. Validate input
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // 3. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Save user to database
    await User.create({
      fullName,
      email,
      password: hashedPassword
    });

    // 6. Send success response
    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});


// Login route
// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // 2. Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // 4. Success
    // 4. Generate JWT token
const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

// 5. Send token + user info
res.status(200).json({
  message: "Login successful",
  token,
  user: {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role
  }
});


  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
});

// Logout route
router.post("/logout", (req, res) => {
  res.status(200).json({
    message: "Logout successful. Please delete token on client side."
  });
});


// Get current logged-in user
router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    user: req.user
  });
});


// Export router (ONLY ONCE, AT THE BOTTOM)
module.exports = router;
