var express = require('express');
var router = express.Router();
const multer = require('multer'); // Import multer
const Food = require('../../models/food/food'); // Import food model
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/img')); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

function checkFileUpLoad(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Bạn chỉ được upload file ảnh'));
  }
  cb(null, true);
}

const upload = multer({ storage: storage, fileFilter: checkFileUpLoad });

router.get('/', async (req, res, next) => {
  try {
    const foods = await Food.find(); // Sửa đổi ở đây
    res.json(foods);
  } catch (err) {
    next(err);
  }
});

router.post('/add', upload.single('img'), async (req, res) => {
  try {
    const { tenfood, loai, gia, trangthai } = req.body;
    const img = req.file.originalname;
    const newFood = { tenfood, loai, img, gia, trangthai };

    const result = await Food.create(newFood); // Sửa đổi ở đây
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.put('/update/:id', upload.single('img'), async (req, res) => { // Sửa 'image' thành 'img'
  try {
    const { id } = req.params;
    const { tenfood, loai, gia, trangthai } = req.body;
    const img = req.file ? req.file.originalname : undefined;

    const updatedFood = { tenfood, loai, gia, trangthai };
    if (img) {
      updatedFood.img = img;
    }

    const result = await Food.findByIdAndUpdate(id, updatedFood, { new: true }); // Sửa đổi ở đây
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
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
    const results = await Food.find(query); // Sửa đổi ở đây
    res.json(results);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const foodId = req.params.id;
    const foodData = await Food.findById(foodId); // Sửa đổi ở đây
    if (foodData) {
      res.json(foodData);
    } else {
      res.status(404).send({ error: 'Món ăn không tồn tại' });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Food.findByIdAndDelete(id); // Sửa đổi ở đây
    res.json({ message: "Xóa món ăn thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});