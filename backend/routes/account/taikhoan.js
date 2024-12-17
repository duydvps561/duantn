const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Taikhoan = require("../../models/account/taikhoan");
const Hoadon = require("../../models/food/hoadon");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destPath = path.join(__dirname, "../../public/img/user");
    cb(null, destPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

function checkFileUpload(req, file, cb) {
  const fileTypes = /\.(jpg|jpeg|png|gif)$/;
  if (!file.originalname.match(fileTypes)) {
    return cb(new Error("Bạn chỉ được upload file ảnh"));
  }
  cb(null, true);
}

const upload = multer({
  storage: storage,
  fileFilter: checkFileUpload,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn kích thước tệp 5MB
});

// Get all accounts
router.get("/", async (req, res, next) => {
  try {
    const taikhoan = await Taikhoan.find();
    if (!taikhoan.length) {
      return res.status(404).send({ error: "No accounts found" });
    }
    res.json(taikhoan);
  } catch (err) {
    next(err);
  }
});

// Get accounts with invoices over 10,000
router.get("/lonhon1000", async (req, res) => {
  try {
    const invoices = await Hoadon.find({ tongtien: { $gt: 10000 } }).select(
      "taikhoan_id"
    );
    if (!invoices.length) {
      return res
        .status(404)
        .send({ error: "No accounts found with invoices over 10,000" });
    }
    const accountIds = invoices.map((invoice) => invoice.taikhoan_id);
    const accounts = await Taikhoan.find({ _id: { $in: accountIds } });
    res.json(accounts);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Add a new account
router.post("/add", upload.single("img"), async (req, res) => {
  try {
    const {
      tentaikhoan,
      gioitinh,
      sdt,
      ngaysinh,
      email,
      matkhau,
      trangthai,
      vaitro,
    } = req.body;

    if (!tentaikhoan || !matkhau || !email) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const matkhauRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).send({ error: "Invalid email format" });
    }
    if (!matkhauRegex.test(matkhau)) {
      return res.status(400).send({ error: "Invalid password format" });
    }

    const img = req.file ? req.file.originalname : null;
    const newtaikhoan = {
      tentaikhoan,
      gioitinh,
      sdt,
      ngaysinh,
      email,
      matkhau,
      trangthai,
      vaitro,
      img,
    };
    const result = await Taikhoan.create(newtaikhoan);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get account by ID
router.get("/:id", async (req, res) => {
  try {
    const taikhoan = await Taikhoan.findById(req.params.id);
    if (!taikhoan) {
      return res.status(404).send({ error: "Account not found" });
    }
    res.json(taikhoan);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.put("/:id", upload.single("img"), async (req, res) => {
  try {
    const { email, tentaikhoan, sdt, ngaysinh } = req.body;

    // Kiểm tra ID tài khoản
    const taikhoan = await Taikhoan.findById(req.params.id);
    if (!taikhoan) {
      return res.status(404).send({ error: "Account not found" });
    }

    // Kiểm tra dữ liệu cập nhật
    if (!email && !tentaikhoan && !sdt && !ngaysinh && !req.file) {
      return res.status(400).send({ error: "No data provided for update" });
    }

    // Cập nhật thông tin từ phần thân yêu cầu
    if (email) taikhoan.email = email;
    if (tentaikhoan) taikhoan.tentaikhoan = tentaikhoan;
    if (sdt) taikhoan.sdt = sdt;
    if (ngaysinh) taikhoan.ngaysinh = ngaysinh;

    // Cập nhật hình ảnh nếu có
    if (req.file) {
      console.log("Uploaded file:", req.file.filename);
      taikhoan.img = `/img/user/${req.file.filename}`;
    }

    // Lưu thông tin cập nhật vào cơ sở dữ liệu
    const updatedAccount = await taikhoan.save();

    // Trả về thông tin người dùng đã được cập nhật
    res.status(200).json(updatedAccount);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: err.message });
  }
});

// Delete account
router.delete("/:id", async (req, res) => {
  try {
    const taikhoan = await Taikhoan.findByIdAndDelete(req.params.id);
    if (!taikhoan) {
      return res.status(404).send({ error: "Account not found" });
    }
    res.status(200).send({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Search account by name
router.get("/search/:name", async (req, res) => {
  try {
    const taikhoan = await Taikhoan.find({
      tentaikhoan: new RegExp(req.params.name, "i"),
    });
    if (!taikhoan.length) {
      return res.status(404).send({ error: "No accounts found" });
    }
    res.json(taikhoan);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
