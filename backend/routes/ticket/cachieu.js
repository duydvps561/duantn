var express = require('express');
var router = express.Router();
const Cachieu = require('../../models/ticket/cachieu');

// Lấy tất cả CaChieu
router.get('/', async (req, res, next) => {
  try {
    const cachieu = await Cachieu.find();
    res.json(cachieu);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch CaChieu records' });
    next(err);
  }
});
router.get('/phim/:phimId/ngay/:ngay', async (req, res, next) => {
  try {
    const phimId = req.params.phimId;
    const ngay = new Date(req.params.ngay);
    const cachieu = await Cachieu.find({ phim_id: phimId, ngaychieu: ngay });
    res.json(cachieu);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch specific CaChieu' });
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
    res.status(500).json({ error: 'Failed to add CaChieu' });
  }
});

// Lấy thông tin CaChieu theo ID
router.get('/:id', async (req, res) => {
  try {
    const CachieuId = req.params.id;
    console.log('CachieuId:', CachieuId); 
    const CachieuData = await Cachieu.findById(CachieuId);
    if (CachieuData) {
      res.json(CachieuData);
    } else {
      res.status(404).send({ error: 'CaChieu không tồn tại' });
    }
  } catch (err) {
    console.error('Error fetching CaChieu:', err); // In lỗi ra console
    res.status(500).send({ error: err.message });
  }
});

// Cập nhật CaChieu theo ID
router.put('/update/:id', async (req, res) => {
  try {
    const { phongchieu_id, phim_id, ngaychieu, giobatdau, gioketthuc } = req.body;
    const updatedCaChieu = await Cachieu.findByIdAndUpdate(req.params.id, {
      phongchieu_id,
      phim_id,
      ngaychieu,
      giobatdau,
      gioketthuc
    }, { new: true });

    if (!updatedCaChieu) {
      return res.status(404).send('Ca chiếu không tìm thấy');
    }

    res.send(updatedCaChieu);
  } catch (error) {
    console.error('Error updating CaChieu:', error);
    res.status(500).send('Đã xảy ra lỗi khi cập nhật ca chiếu');
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
    res.status(500).json({ error: 'Failed to delete CaChieu' });
  }
});

// Kiểm tra tình trạng sẵn có của CaChieu
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
    res.status(500).json({ error: 'Failed to check CaChieu availability' });
  }
});

module.exports = router;
