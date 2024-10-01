var express = require('express');
var router = express.Router();
const multer = require('multer'); // Import multer
const Food = require('../../models/food/food'); // Import food model
const path = require('path');

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/img')); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// File type validation
function checkFileUpload(req, file, cb) {
  const fileTypes = /\.(jpg|jpeg|png|gif)$/;
  if (!file.originalname.match(fileTypes)) {
    return cb(new Error('Bạn chỉ được upload file ảnh'));
  }
  cb(null, true);
}

const upload = multer({ storage: storage, fileFilter: checkFileUpload });

// GET all food items
router.get('/', async (req, res, next) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    next(err);
  }
});

// POST a new food item
router.post('/add', upload.single('img'), async (req, res) => {
  try {
    const { tenfood, loai, gia, trangthai } = req.body;
    const img = req.file ? req.file.originalname : null; // Ensure img is set

    const newFood = { tenfood, loai, img, gia, trangthai };

    const result = await Food.create(newFood);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// PUT update a food item
router.put('/update/:id', upload.single('img'), async (req, res) => {
  try {
    const { id } = req.params;
    const { tenfood, loai, gia, trangthai } = req.body;
    const img = req.file ? req.file.originalname : undefined; // Handle optional image

    const updatedFood = { tenfood, loai, gia, trangthai };
    if (img) {
      updatedFood.img = img;
    }

    const result = await Food.findByIdAndUpdate(id, updatedFood, { new: true });
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ error: 'Món ăn không tồn tại' });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET search food items
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

// GET a food item by ID
router.get('/:id', async (req, res) => {
  try {
    const foodId = req.params.id;
    const foodData = await Food.findById(foodId);
    if (foodData) {
      res.json(foodData);
    } else {res.status(404).send({ error: 'Món ăn không tồn tại' });
  }
} catch (err) {
  res.status(500).send({ error: err.message });
}
});

// DELETE a food item
router.delete('/delete/:id', async (req, res) => {
try {
  const { id } = req.params;
  const deletedFood = await Food.findByIdAndDelete(id);
  if (deletedFood) {
    res.json({ message: "Xóa món ăn thành công" });
  } else {
    res.status(404).send({ error: 'Món ăn không tồn tại' });
  }
} catch (error) {
  res.status(500).json({ message: error.message });
}
});

module.exports = router;