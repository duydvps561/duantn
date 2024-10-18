var express = require('express');
var router = express.Router();
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
      const { phongchieu_id, danhSachHang } = req.body;
  
      // Kiểm tra phòng chiếu có tồn tại không
      const phongChieu = await Phongchieu.findById(phongchieu_id);
      if (!phongChieu) {
        return res.status(404).json({ message: 'Phòng chiếu không tồn tại' });
      }
  
      let gheMoi = [];
  
      for (const hangObj of danhSachHang) {
        const { hang, soCot, loaiGheTheoViTri } = hangObj;
  
        // Kiểm tra xem hàng đã tồn tại chưa
        const gheHienTai = await Ghe.find({ phongchieu_id, hang }).sort({ cot: 1 });
        let cotBatDau = gheHienTai.length > 0 ? parseInt(gheHienTai[gheHienTai.length - 1].cot) + 1 : 1;
  
        for (let j = cotBatDau; j < cotBatDau + soCot; j++) {
          let loaighe_id = null;
  
          // Xác định loại ghế theo vị trí
          for (const loaiGhe of loaiGheTheoViTri) {
            if (j >= loaiGhe.tuViTri && j <= loaiGhe.denViTri) {
              loaighe_id = loaiGhe.loaiGheId;
              break;
            }
          }
  
          // Nếu không tìm thấy loại ghế cho vị trí cột
          if (!loaighe_id) {
            return res.status(400).json({ message: `Không có loại ghế cho vị trí cột ${j} trong hàng ${hang}` });
          }
  
          // Tạo ghế mới
          const ghe = new Ghe({
            phongchieu_id,
            hang,
            cot: `${j}`, // Số cột
            loaighe_id
          });
          gheMoi.push(ghe);
        }
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
