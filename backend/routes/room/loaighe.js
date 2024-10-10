var express = require('express');
var router = express.Router();
const Loaighe = require('../../models/room/loaighe');

// Get all Loai Ghe
router.get('/', async (req, res, next) => {
  try {
    const loaighe = await Loaighe.find(); 
    res.json(loaighe);
  } catch (err) {
    next(err);
  }
});

// Get Loai Ghe by ID
router.get('/:id', async (req, res) => {
  try {
    const loaigheId = req.params.id;
    const loaigheData = await Loaighe.findById(loaigheId);
    if (loaigheData) {
      res.json(loaigheData);
    } else {
      res.status(404).send({ error: 'Loại ghế không tồn tại' });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Add new Loai Ghe
router.post('/add', async (req, res) => {
  try {
    const loaighe = new Loaighe(req.body);
    const result = await loaighe.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Update Loai Ghe by ID
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const loaigheData = await Loaighe.findById(id);
    
    if (!loaigheData) {
      return res.status(404).send({ error: 'Loại ghế không tồn tại' });
    }

    // Cập nhật thông tin loại ghế
    loaigheData.loaighe = req.body.loaighe || loaigheData.loaighe;
    
    const updatedLoaighe = await loaigheData.save();
    res.status(200).send(updatedLoaighe);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Delete Loai Ghe by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const loaighe = await Loaighe.findByIdAndDelete(id);
    if (!loaighe) {
      return res.status(404).send({ error: 'Loại ghế không tồn tại' });
    }
    res.status(200).send({ message: 'Loại ghế đã được xóa' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
