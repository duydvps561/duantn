const express = require('express');
const router = express.Router();
const multer = require('multer');
const Food = require('../../models/food/food');
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

const upload = multer({ storage: storage, fileFilter: checkFileUpload });


router.get('/', async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Món ăn không tồn tại' });
    }
    res.status(200).json(food);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/add', upload.single('img'), async (req, res) => {
  try {
    const { tenfood, soluong, loai, gia, trangthai } = req.body;
    const img = req.file ? req.file.originalname : null;

    const newFood = new Food({
      tenfood,
      soluong,
      gia,
      loai,
      trangthai: soluong == 0 ? 0 : trangthai, 
      img
    });

    const savedFood = await newFood.save();
    res.status(201).json(savedFood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/update/:id', upload.single('img'), async (req, res) => {
  try {
    const { tenfood, soluong, loai, gia, trangthai } = req.body;
    const img = req.file ? req.file.originalname : null;

    // Kiểm tra nếu soluong = 0, chuyển trạng thái thành hết hàng
    let updatedTrangthai = trangthai;
    if (soluong == 0) updatedTrangthai = 0;

    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: 'Món ăn không tồn tại' });

    // Update fields
    food.tenfood = tenfood;
    food.soluong = soluong;
    food.gia = gia;
    food.loai = loai;
    food.trangthai = updatedTrangthai;
    if (img) food.img = img;

    await food.save();
    res.status(200).json({ message: 'Cập nhật món ăn thành công' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


router.delete('/delete/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Món ăn không tồn tại' });
    }

    await food.remove();
    res.status(200).json({ message: 'Xóa món ăn thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/search', async (req, res) => {
  const { keyword, loai, startDate, endDate } = req.query;

  const query = {};

  if (keyword) {
    const regex = new RegExp(keyword, 'i');
    query.$or = [
      { tenfood: { $regex: regex } }
    ];
  }

  if (loai) {
    query.loai = loai;
  }

  if (startDate && endDate) {
    query.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  try {
    const results = await Food.find(query);
    res.json(results);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
module.exports = router;
