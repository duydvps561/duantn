const express = require('express');
const router = express.Router();
const Phongchieu = require('../../models/room/phongchieu');
const Loaiphong = require('../../models/room/loaiphong');
const Ghe = require('../../models/room/ghe');
// Lấy tất cả phòng chiếu
router.get('/', async (req, res, next) => {
  try {
    const phongchieu = await Phongchieu.find().populate('loaiphong_id', 'loaiphong');
    res.json(phongchieu);
  } catch (err) {
    next(err);
  }
});

// Lấy phòng chiếu theo ID
router.get('/:id', async (req, res) => {
  try {
    const phongchieuId = req.params.id;
    const phongchieuData = await Phongchieu.findById(phongchieuId).populate('loaiphong_id', 'loaiphong');
    if (!phongchieuData) {
      return res.status(404).send({ error: 'Phòng chiếu không tồn tại' });
    }
    res.json(phongchieuData);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Thêm phòng chiếu mới
router.post('/add', async (req, res) => {
  try {
    const { loaiphong_id, tenphong } = req.body;

    const loaiphong = await Loaiphong.findById(loaiphong_id);
    if (!loaiphong) {
      return res.status(404).send({ error: 'Loại phòng không tồn tại' });
    }

    const phongchieu = new Phongchieu({ loaiphong_id, tenphong });
    const result = await phongchieu.save();
    
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Cập nhật phòng chiếu theo ID
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { loaiphong_id, tenphong, trangthai } = req.body;

    const phongchieuData = await Phongchieu.findById(id);
    if (!phongchieuData) {
      return res.status(404).send({ error: 'Phòng chiếu không tồn tại' });
    }

    // Cập nhật thông tin phòng chiếu
    phongchieuData.loaiphong_id = loaiphong_id || phongchieuData.loaiphong_id;
    phongchieuData.tenphong = tenphong || phongchieuData.tenphong;
    phongchieuData.trangthai = trangthai || phongchieuData.trangthai;

    const updatedPhongchieu = await phongchieuData.save();
    res.status(200).send(updatedPhongchieu);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Xóa phòng chiếu theo ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const phongchieu = await Phongchieu.findByIdAndDelete(id);
    if (!phongchieu) {
      return res.status(404).send({ error: 'Phòng chiếu không tồn tại' });
    }
    res.status(200).send({ message: 'Phòng chiếu đã được xóa' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
router.get('/ghe/:id', async (req, res) => {
  try {
    const phongchieuId = req.params.id;

    // Tìm phòng chiếu theo ID
    const phongchieuData = await Phongchieu.findById(phongchieuId).populate('loaiphong_id', 'loaiphong');
    if (!phongchieuData) {
      return res.status(404).send({ error: 'Phòng chiếu không tồn tại' });
    }

    // Tìm tất cả ghế thuộc phòng chiếu đó, sắp xếp theo hàng và cột
    const gheData = await Ghe.find({ phongchieu_id: phongchieuId }).sort({ hang: 1, cot: 1 }).populate('loaighe_id', 'tenLoaiGhe');
    
    // Tạo một cấu trúc trả về với thông tin chi tiết phòng chiếu và danh sách ghế
    const phongchieuDetail = {
      phongchieu: phongchieuData,
      ghe: gheData
    };

    // Trả về kết quả
    res.json(phongchieuDetail);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;