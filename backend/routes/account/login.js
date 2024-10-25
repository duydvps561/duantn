var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Taikhoan = require("../../models/account/taikhoan.js"); // Import the Taikhoan model
const { connect } = require("../../config/db.js"); // Database connection
const auth = require("../../middleware/auth.js"); // Authentication middleware

// Login API
router.post("/login", async (req, res) => {
  try {
    await connect(); // Connect to the database

    const { email, matkhau } = req.body;

    // Validate required fields
    if (!email || !matkhau) {
      return res
        .status(400)
        .json({ message: "Email và mật khẩu là bắt buộc." });
    }

    // Find the user by email
    const user = await Taikhoan.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không đúng." });
    }

    // Check if the password matches the hash stored in the database
    const isMatch = await bcrypt.compare(matkhau, user.matkhau);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không đúng." });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, vaitro: user.vaitro },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Return the token
    res.json({ message: "Đăng nhập thành công", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại." });
  }
});

module.exports = router;
