var express = require('express');
var router = express.Router();
const Cachieu = require('../../models/ticket/cachieu');

// Lấy tất cả CaChieu
router.get('/', async (req, res, next) => {
  try {
    const cachieu = await Cachieu.find();
    res.json(cachieu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Không thể lấy danh sách CaChieu' });
    next(err);
  }
});

// Lấy CaChieu cho một phim và ngày cụ thể
router.get('/phim/:phimId/ngay/:ngay', async (req, res, next) => {
  try {
    const phimId = req.params.phimId;
    const ngay = new Date(req.params.ngay);
    const cachieu = await Cachieu.find({ phim_id: phimId, ngaychieu: ngay });
    res.json(cachieu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Không thể lấy thông tin CaChieu' });
    next(err);
  }
});

// Thêm một CaChieu mới
router.post('/add', async (req, res) => {
  try {
    const cachieu = new Cachieu(req.body);
    const result = await cachieu.save();
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Không thể thêm CaChieu' });
  }
});

// Kiểm tra tình trạng chỗ ngồi CaChieu
router.post('/check', async (req, res) => {
  const { phongchieu_id, ngaychieu, giobatdau, gioketthuc } = req.body;

  try {
    const existingCaChieu = await Cachieu.findOne({
      phongchieu_id,
      ngaychieu,
      $or: [
        { giobatdau: { $lt: gioketthuc, $gte: giobatdau } },
        { gioketthuc: { $gt: giobatdau, $lte: gioketthuc } }
      ]
    });

    if (existingCaChieu) {
      res.json({ available: false, message: 'Thời gian đã được đặt.' });
    } else {
      res.json({ available: true, message: 'Thời gian có sẵn.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Không thể kiểm tra tình trạng CaChieu' });
  }
});

// Xóa CaChieu theo ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCaChieu = await Cachieu.findByIdAndDelete(id);
    if (!deletedCaChieu) {
      return res.status(404).json({ error: 'CaChieu không tìm thấy' });
    }
    res.json({ message: 'CaChieu đã xóa thành công' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Không thể xóa CaChieu' });
  }
});

// Lấy thông tin CaChieu theo ID
router.put('/update/:id', async (req, res) => {
  try {
    const updatedCaChieu = await Cachieu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCaChieu) {
      return res.status(404).json({ error: 'CaChieu không tồn tại' });
    }
    res.json(updatedCaChieu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Không thể cập nhật CaChieu' });
  }
});
// Xóa một CaChieu
router.get('/:id', async (req, res) => {
  try {
      const cachieu = await Cachieu.findById(req.params.id);
      if (!cachieu) {
          return res.status(404).json({ error: 'CaChieu không tồn tại' });
      }
      res.json(cachieu);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Không thể lấy thông tin CaChieu' });
  }
});


module.exports = router;
