const express = require('express');
const router = express.Router();
const Ghe = require('../../models/room/ghe');
const Phongchieu = require('../../models/room/phongchieu');

// Lấy tất cả các ghế
router.get('/', async function(req, res, next) {
  try {
    const ghe = await Ghe.find();
    res.json(ghe);
  } catch (err) {
    next(err);
  }
});

// Thêm nhiều ghế cho một phòng chiếu
router.post('/them-ghe', async (req, res) => {
  try {
    const { phongchieu_id, danhSachGhe } = req.body;

    // Kiểm tra phòng chiếu có tồn tại không
    const phongChieu = await Phongchieu.findById(phongchieu_id);
    if (!phongChieu) {
      return res.status(404).json({ message: 'Phòng chiếu không tồn tại' });
    }

    let gheMoi = [];

    for (const gheData of danhSachGhe) {
      const { hang, cot, loaiGheId } = gheData;
      if (!hang || !cot || !loaiGheId) {
        return res.status(400).json({ message: 'Thông tin ghế không hợp lệ' });
      }

      // Tạo ghế mới
      const ghe = new Ghe({
        phongchieu_id,
        hang,
        cot,
        loaighe_id: loaiGheId
      });
      gheMoi.push(ghe);
    }

    // Lưu tất cả ghế vào database
    await Ghe.insertMany(gheMoi);
    res.status(200).json({ message: 'Thêm ghế thành công', gheMoi });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi khi thêm ghế', error: err.message });
  }
});

module.exports = router;
