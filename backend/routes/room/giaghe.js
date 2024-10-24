var express = require('express');
var router = express.Router();
const Giaghe = require('../../models/room/giaghe');
const Loaighe = require('../../models/room/loaighe'); // Import model Loaighe để lấy tên loại ghế

// Get all Gia Ghe
router.get('/', async (req, res) => {
  try {
    const giagheList = await Giaghe.find().populate('loaighe_id', 'loaighe');

    res.json(giagheList);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get Gia Ghe by ID
router.get('/:id', async (req, res) => {
  try {
    const giagheId = req.params.id;
    const giaghe = await Giaghe.findById(giagheId).populate('loaighe_id', 'loaighe');
    if (!giaghe) {
      return res.status(404).send({ error: 'Giá ghế không tồn tại' });
    }
    res.json(giaghe);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
// lấy tất cả các giá theo giờ bắt đầu
    router.get('/batdau/:giobatdau', async (req, res) => {
      try {
        const giobatdau = parseInt(req.params.giobatdau);
        const giagheList = await Giaghe.find({ giobatdau: { $gte: giobatdau } }).populate('loaighe_id', 'loaighe');
        res.json(giagheList);
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });
// Add Gia Ghe
router.post('/add', async (req, res) => {
  try {
    const {
      loaighe_id,
      giaghe,
      giobatdau,
      gioketthuc,
      trangthai,
    } = req.body; // Sử dụng req thay vì rep
    const loaighe = await Loaighe.findById(loaighe_id);
    if (!loaighe) {
      return res.status(404).send({ error: 'Loại ghế không tồn tại' });
    }
    if (!giaghe || giaghe <= 0) {
      return res.status(400).send({ error: 'Giá ghế phải lớn hơn 0' });
    }
    const newGiaghe = new Giaghe({
      loaighe_id,
      giaghe,
      giobatdau,
      gioketthuc,
      trangthai: trangthai || 1
    });
    const result = await newGiaghe.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
// Update Gia Ghe
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { loaighe_id, giaghe, giobatdau, gioketthuc, trangthai } = req.body;

    const giagheData = await Giaghe.findById(id);
    if (!giagheData) {
      return res.status(404).send({ error: 'Giá ghế không tồn tại' });
    }

    if (loaighe_id) {
      const loaighe = await Loaighe.findById(loaighe_id);
      if (!loaighe) {
        return res.status(404).send({ error: 'Loại ghế không tồn tại' });
      }
      giagheData.loaighe_id = loaighe_id;
    }

    giagheData.giaghe = giaghe || giagheData.giaghe;
    giagheData.giobatdau = giobatdau || giagheData.giobatdau;
    giagheData.gioketthuc = gioketthuc || giagheData.gioketthuc;
    giagheData.trangthai = trangthai !== undefined ? trangthai : giagheData.trangthai;

    const updatedGiaghe = await giagheData.save();
    res.status(200).send(updatedGiaghe);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
// lấy ra giá loại ghế
router.get('/loaighe/:id', async (req, res) => {
  try {
    const loaigheId = req.params.id;

    const giagheList = await Giaghe.find({ loaighe_id: loaigheId }).populate('loaighe_id', 'loaighe');

    if (giagheList.length === 0) {
      return res.status(404).send({ error: 'Không có giá ghế nào cho loại ghế này' });
    }
    res.json(giagheList);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Delete Gia Ghe
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const giaghe = await Giaghe.findByIdAndDelete(id);
    if (!giaghe) {
      return res.status(404).send({ error: 'Giá ghế không tồn tại' });
    }
    res.status(200).send({ message: 'Giá ghế đã được xóa thành công' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
