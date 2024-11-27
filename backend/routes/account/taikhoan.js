const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Taikhoan = require("../../models/account/taikhoan");
const Hoadon = require("../../models/food/hoadon");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/img/user"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
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
// Update account
router.put("/:id", async (req, res) => {
  try {
    const taikhoan = await Taikhoan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!taikhoan) {
      return res.status(404).send({ error: "Account not found" });
    }
    res.json(taikhoan);
  } catch (err) {
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
