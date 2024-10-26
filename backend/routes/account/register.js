var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const Taikhoan = require('../../models/account/taikhoan.js'); // Import the Taikhoan model
const { connect } = require('../../config/db.js'); // Đường dẫn đến file db.js

// Đăng ký tài khoản với mã hóa mật khẩu bcrypt
router.post('/add', async (req, res, next) => {
    try {
        await connect(); // Kết nối tới cơ sở dữ liệu
        const { tentaikhoan, gioitinh, sdt, ngaysinh, email, matkhau, trangthai, vaitro} = req.body;
        // Kiểm tra các trường đầu vào
        if (!email || !matkhau) {
            return res.status(400).json({ message: "Email và mật khẩu là bắt buộc." });
        }
        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = await Taikhoan.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email đã tồn tại" });
        }
        // Mã hóa mật khẩu
        const hashPassword = await bcrypt.hash(matkhau, 10);
        // Tạo đối tượng người dùng mới
        const img = req.file ? req.file.originalname : null;
        const newUser = { 
            tentaikhoan, 
            gioitinh, 
            sdt, 
            ngaysinh, 
            email, 
            matkhau: hashPassword, 
            trangthai :trangthai || "hoạt động", 
            vaitro: vaitro || 'user', // Gán vai trò mặc định nếu không có
            img: img 
        };
        // Lưu người dùng mới vào cơ sở dữ liệu
        const result = await Taikhoan.create(newUser);
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: console.log(req.body) });
    }
});
module.exports = router;