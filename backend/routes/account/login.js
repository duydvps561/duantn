var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { connect } = require("../../config/db.js");
const Taikhoan = require("../../models/account/taikhoan.js");

router.post("/login", async (req, res, next) => {
  try {
    await connect();
    const { email, matkhau } = req.body;

    if (!email || !matkhau) {
      return res
        .status(400)
        .json({ message: "Email và mật khẩu là bắt buộc." });
    }

    const user = await Taikhoan.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email không tồn tại" });
    }

    const match = await bcrypt.compare(matkhau, user.matkhau);
    if (!match) {
      return res.status(400).json({ message: "Mật khẩu không chính xác" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.vaitro,
        username: user.tentaikhoan,
      },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.vaitro,
        username: user.tentaikhoan,
        phone: user.sdt,
        birth: user.ngaysinh,
        gioitinh: user.gioitinh,
        trangthai: user.trangthai,
        img:user.img,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
});

router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Xác thực thành công" });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET || "default_secret", (err, user) => {
    if (err) return res.sendStatus(403); 
    req.user = user;
    next();
  });
}

module.exports = router;
