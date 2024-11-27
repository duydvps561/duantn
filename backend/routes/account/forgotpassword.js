const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Taikhoan = require("../../models/account/taikhoan.js");
require('dotenv').config();

// Quên mật khẩu
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Taikhoan.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "Email không tồn tại trong hệ thống." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADMIN,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `${process.env.BASE_URL}/resetpass?userId=${user._id}&token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_ADMIN,
      to: email,
      subject: "Yêu cầu đặt lại mật khẩu",
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <h2 style="color: #333;">Xin chào ${user.name || "bạn"},</h2>
            <p style="color: #555; font-size: 16px; line-height: 1.6;">
              Chúng tôi nhận được yêu cầu đặt lại mật khẩu từ tài khoản của bạn. Vui lòng bấm vào liên kết bên dưới để đặt lại mật khẩu:
            </p>
            <a href="${resetLink}" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Đặt lại mật khẩu</a>
            <p style="color: #888; font-size: 14px; margin-top: 20px;">
              Liên kết này chỉ có hiệu lực trong vòng 15 phút.
            </p>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Email đặt lại mật khẩu đã được gửi." });
  } catch (err) {
    console.error("Error sending forgot password email:", err);
    res.status(500).send({ error: "Có lỗi xảy ra khi gửi email." });
  }
});

// Đặt lại mật khẩu
router.post("/reset-password/:userId", async (req, res) => {
  console.log("Reset password route hit");  // Add logging for debugging

  const { userId } = req.params;
  const { token, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send({ error: "Mật khẩu xác nhận không khớp." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id !== userId) {
      return res.status(400).send({ error: "Token không hợp lệ." });
    }

    const user = await Taikhoan.findById(userId);
    if (!user) {
      return res.status(404).send({ error: "Người dùng không tồn tại." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).send({ message: "Đổi mật khẩu thành công." });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(400).send({ error: "Token đã hết hạn." });
    }
    console.error("Error resetting password:", err);
    res.status(500).send({ error: "Có lỗi xảy ra khi đặt lại mật khẩu." });
  }
});

module.exports = router;
