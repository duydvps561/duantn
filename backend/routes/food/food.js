const express = require('express');
const router = express.Router();
const multer = require('multer');
const Food = require('../../models/food/food');
const path = require('path');

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/img/food'));
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

// Get all food items
router.get('/', async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (err) {
    console.error('Error fetching food items:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get food by ID
router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      console.error('Food item not found with id:', req.params.id);
      return res.status(404).json({ message: 'Món ăn không tồn tại' });
    }
    res.status(200).json(food);
  } catch (err) {
    console.error('Error fetching food item by id:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add new food item
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
    console.error('Error adding new food item:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update food item
router.put('/update/:id', upload.single('img'), async (req, res) => {
  try {
    const { tenfood, soluong, loai, gia, trangthai } = req.body;
    const img = req.file ? req.file.originalname : null;

    const food = await Food.findById(req.params.id);
    if (!food) {
      console.error('Food item not found for update:', req.params.id);
      return res.status(404).json({ message: 'Món ăn không tồn tại' });
    }

    food.tenfood = tenfood;
    food.soluong = soluong;
    food.gia = gia;
    food.loai = loai;
    food.trangthai = soluong == 0 ? 0 : trangthai;
    if (img) food.img = img;

    await food.save();
    res.status(200).json({ message: 'Cập nhật món ăn thành công' });
  } catch (err) {
    console.error('Error updating food item:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.delete('/delete/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      console.error('Food item not found for deletion:', req.params.id);
      return res.status(404).json({ message: 'Món ăn không tồn tại' });
    }

    await food.deleteOne(); // Use deleteOne() instead of remove()
    res.status(200).json({ message: 'Xóa món ăn thành công' });
  } catch (err) {
    console.error('Error deleting food item:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
