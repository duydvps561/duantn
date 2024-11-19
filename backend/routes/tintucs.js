var express = require('express');
var router = express.Router();
const multer = require('multer');
const tintuc = require('../models/tintuc');

function createSlug(title) {
  return title
    .toLowerCase() // Chuyển thành chữ thường
    .normalize("NFD") // Chuẩn hóa Unicode để loại bỏ dấu
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các ký tự dấu tiếng Việt
    .replace(/[^a-z0-9\s-]/g, "") // Loại bỏ ký tự đặc biệt, giữ lại khoảng trắng và dấu '-'
    .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu '-'
    .replace(/-+/g, "-") // Loại bỏ dấu '-' lặp lại
    .replace(/^-|-$/g, ""); // Loại bỏ dấu '-' ở đầu và cuối
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img/tintuc');
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

// Get all tintuc
router.get('/', async (req, res, next) => {
  try {
    const tintucs = await tintuc.find(); 
    res.json(tintucs);
  } catch (err) {
    next(err);
  }
});

// Add new tintuc
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { title, describe, content, view, loai, trangthai } = req.body;
    const image = req.file ? req.file.originalname : null;

    // Tạo slug từ tiêu đề
    const baseSlug = createSlug(title);
    let uniqueSlug = baseSlug;

    // Kiểm tra trùng lặp `_id`
    let count = 0;
    while (await tintuc.findById(uniqueSlug)) {
      count++;
      uniqueSlug = `${baseSlug}-${count}`;
    }

    const newTintuc = {
      _id: uniqueSlug,
      title,
      describe,
      content,
      image,
      view,
      loai,
      trangthai,
    };

    const result = await tintuc.create(newTintuc);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});



// Update tintuc by ID
router.put('/update/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, describe, content, view, loai, trangthai } = req.body;
    const image = req.file ? req.file.originalname : undefined;

    const updatedTintuc = { title, describe, content, view, loai, trangthai };
    if (image) {
      updatedTintuc.image = image;
    }

    const result = await tintuc.findByIdAndUpdate(id, updatedTintuc, { new: true });
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Search tintuc
router.get('/search', async (req, res) => {
  const { keyword, loai, startDate, endDate } = req.query;
  const query = {};

  if (keyword) {
    const regex = new RegExp(keyword, 'i');
    query.$or = [{ title: { $regex: regex } }];
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
    const results = await tintuc.find(query);
    res.json(results);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get single tintuc by ID
router.get('/:id', async (req, res) => {
  try {
    const tintucId = req.params.id;
    const tintucData = await tintuc.findById(tintucId);
    if (tintucData) {
      res.json(tintucData);
    } else {
      res.status(404).send({ error: 'Bài viết không tồn tại' });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Delete tintuc by ID
router.delete('/deletetintuc/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await tintuc.findByIdAndDelete(id);
    res.json({ message: "Xóa bài viết thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/view/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTintuc = await tintuc.findByIdAndUpdate(
      id,
      { $inc: { view: 1 } },
      { new: true }
    );
    if (!updatedTintuc) {
      return res.status(404).send({ error: 'Bài viết không tồn tại' });
    }
    res.status(200).send(updatedTintuc);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
module.exports = router;
