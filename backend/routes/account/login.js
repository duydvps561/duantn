
var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { connect } = require("../../config/db.js");
const Taikhoan = require("../../models/account/taikhoan.js"); // Import the Taikhoan model
// Đường dẫn đến file db.js

router.post("/login", async (req, res, next) => {
  await connect();
  const { email, matkhau } = req.body;
  const user = await Taikhoan.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email không tồn tại" });
  }
  const match = await bcrypt.compare(matkhau, user.matkhau);
  if (!match) {
    return res.status(400).json({ message: "Mật khẩu không chính xác" });
  }
  const token = jwt.sign({ email: user.email, role: user.role }, "secret", {
    expiresIn: "1h",
  });
  res.status(200).json({ token });
});

module.exports = router;
