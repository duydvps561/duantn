var express = require('express');
var router = express.Router();
const Loaiphong = require('../../models/room/loaiphong');

// Lấy tất cả loại phòng
router.get('/', async function(req, res, next) {
  try {
    const loaiphong = await Loaiphong.find();
    res.json(loaiphong);
  } catch (err) {
    next(err);
  }
});

// Lấy loại phòng theo ID
router.get('/:id', async (req, res) => {
  try {
    const loaiphongId = req.params.id;
    const loaiphongData = await Loaiphong.findById(loaiphongId);
    if (!loaiphongData) {
      return res.status(404).send({ error: 'Loại phòng không tồn tại' });
    }
    res.json(loaiphongData);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


router.post('/add', async (req, res) => {
  try {
    const { loaiphong, trangthai } = req.body;

    // Check if both fields are provided
    if (!loaiphong || !trangthai) {
      return res.status(400).send({ error: 'loaiphong và trangthai là bắt buộc.' });
    }

    // Save the new record
    const phongchieu = new Loaiphong({ loaiphong, trangthai });
    const result = await phongchieu.save();
    
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


// Cập nhật loại phòng theo ID
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { loaiphong, trangthai } = req.body;

    // Find the existing Loaiphong by ID
    const loaiphongData = await Loaiphong.findById(id);
    if (!loaiphongData) {
      return res.status(404).send({ error: 'Loại phòng không tồn tại' });
    }

    // Update loaiphong and trangthai fields if provided
    loaiphongData.loaiphong = loaiphong || loaiphongData.loaiphong;
    loaiphongData.trangthai = trangthai || loaiphongData.trangthai;

    // Save the updated Loaiphong data
    const updatedLoaiphong = await loaiphongData.save();
    res.status(200).send(updatedLoaiphong);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


// Xóa loại phòng theo ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const loaiphong = await Loaiphong.findByIdAndDelete(id);
    if (!loaiphong) {
      return res.status(404).send({ error: 'Loại phòng không tồn tại' });
    }
    res.status(200).send({ message: 'Loại phòng đã được xóa' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
