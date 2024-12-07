const express = require('express');
const router = express.Router();
const Phongchieu = require('../../models/room/phongchieu');
const Loaiphong = require('../../models/room/loaiphong');
const Ghe = require('../../models/room/ghe');
const Loaighe = require('../../models/room/loaighe');
const CaChieu = require('../../models/ticket/cachieu');
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
    const { tenphong, trangthai, loaiphong_id } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!tenphong || !trangthai || !loaiphong_id) {
      return res.status(400).json({ error: 'Vui lòng cung cấp đầy đủ thông tin.' });
    }

    const newPhongchieu = new Phongchieu({ tenphong, trangthai, loaiphong_id });
    await newPhongchieu.save();
    res.status(201).json(newPhongchieu);
  } catch (error) {
    console.error('Error adding room:', error);
    res.status(500).json({ error: 'Lỗi khi thêm phòng. Vui lòng thử lại.' });
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

    // Kiểm tra xem phòng chiếu có tồn tại không
    const phongchieu = await Phongchieu.findById(id);
    if (!phongchieu) {
      return res.status(404).send({ error: 'Phòng chiếu không tồn tại' });
    }

    // Xóa tất cả các ca chiếu liên quan đến phòng chiếu
    const deletedCaChieu = await CaChieu.deleteMany({ phongchieu_id: id });
    
    // Xóa tất cả các ghế liên quan đến phòng chiếu
    const deletedGhe = await Ghe.deleteMany({ phongchieu_id: id });

    // Xóa phòng chiếu
    await Phongchieu.findByIdAndDelete(id);

    res.status(200).send({
      message: 'Phòng chiếu và các dữ liệu liên kết đã được xóa thành công',
      details: {
        deletedCaChieuCount: deletedCaChieu.deletedCount,
        deletedGheCount: deletedGhe.deletedCount,
      },
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


// Lấy danh sách ghế theo phòng chiếu ID
router.get('/ghe/:id', async (req, res) => {
  try {
    const phongchieuId = req.params.id;

    const phongchieuData = await Phongchieu.findById(phongchieuId).populate('loaiphong_id', 'loaiphong');
    if (!phongchieuData) {
      return res.status(404).send({ error: 'Phòng chiếu không tồn tại' });
    }

    const gheData = await Ghe.find({ phongchieu_id: phongchieuId }).sort({ hang: 1, cot: 1 }).populate('loaighe_id', 'loaighe');
    
    const phongchieuDetail = {
      phongchieu: phongchieuData,
      ghe: gheData
    };

    res.json(phongchieuDetail);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Cập nhật ghế theo ID
router.put('/ghe/update/:id', async (req, res) => {
  try {
    const gheId = req.params.id;
    const updatedData = req.body;
    
    const ghe = await Ghe.findByIdAndUpdate(gheId, updatedData, { new: true });

    if (!ghe) {
        return res.status(404).json({ message: 'Ghế không tồn tại' });
    }

    res.status(200).json({ message: 'Cập nhật ghế thành công', ghe });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật ghế', error: err });
  }
});

// Xóa ghế theo ID
router.delete('/ghe/delete/:id', async (req, res) => {
  try {
    const gheId = req.params.id;
    const ghe = await Ghe.findById(gheId);

    if (!ghe) {
      return res.status(404).json({ message: 'Ghế không tồn tại' });
    }

    await Ghe.findByIdAndDelete(gheId);
    res.status(200).json({ message: 'Ghế đã được xóa thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa ghế', error: err });
  }
});

module.exports = router;
