var express = require('express');
var router = express.Router();
const multer = require('multer'); // Import multer
const Taikhoan = require('../../models/account/taikhoan.js'); // Import the Taikhoan model
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/img')); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});
function checkFileUpload(req, file, cb) {
  const fileTypes = /\.(jpg|jpeg|png|gif)$/;
  if (!file.originalname.match(fileTypes)) {
    return cb(new Error('Bạn chỉ được upload file ảnh'));
  }
  cb(null, true);
}
const upload = multer({ 
  storage: storage, 
  fileFilter: checkFileUpload 
});

router.get('/', async (req, res, next) => {
  try {
    const taikhoan = await Taikhoan.find();
    if (!taikhoan.length) {
      return res.status(404).send({ error: 'No accounts found' });
    }
    res.json(taikhoan);
  } catch (err) {
    next(err);
  }
});


router.get('/:id', async (req, res, next) => {
  try {
    const taikhoan = await Taikhoan.findById(req.params.id);
    if (!taikhoan) {
      return res.status(404).send({ error: 'Account not found' });
    }
    res.json(taikhoan);
  } catch (err) {
    next(err);
  }
});

// Add a new account
router.post('/add', upload.single('img'), async (req, res) => {
  try {
    // Destructure request body
    const { tentaikhoan, gioitinh, sdt, ngaysinh, email, matkhau, trangthai, vaitro } = req.body;

    // Validate required fields
    if (!tentaikhoan || !matkhau || !email) {
      return res.status(400).send({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({ error: 'Invalid email format' });
    }
    const matkhauRegex= "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
    if(!matkhauRegex.test(matkhau)){
      return res.status(400).send({ error: 'Invalid email format' });
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
      img 
    };

    const result = await Taikhoan.create(newtaikhoan);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Update account by ID
router.put('/:id', async (req, res) => {
  try {
    const taikhoan = await Taikhoan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!taikhoan) {
      return res.status(404).send({ error: 'Account not found' });
    }
    res.json(taikhoan);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Delete account by ID
router.delete('/:id', async (req, res) => {
  try {
    const taikhoan = await Taikhoan.findByIdAndDelete(req.params.id);
    if (!taikhoan) {
      return res.status(404).send({ error: 'Account not found' });
    }
    res.status(200).send("Account deleted successfully");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Search account by name
router.get('/search/:name', async (req, res) => {
  try {
    const taikhoan = await Taikhoan.find({ tentaikhoan: new RegExp(req.params.name, 'i') });
    if (!taikhoan.length) {
      return res.status(404).send({ error: 'No accounts found' });
    }
    res.json(taikhoan);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;