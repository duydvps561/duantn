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
        const { phongchieu_id, hang, soCot, loaiGheIds } = req.body;

        // Kiểm tra xem phòng chiếu có tồn tại không
        const phongChieu = await Phongchieu.findById(phongchieu_id);
        if (!phongChieu) {
            return res.status(404).json({ message: 'Phòng chiếu không tồn tại' });
        }

        // Tạo ghế mới cho một hàng cố định
        let gheMoi = [];
        for (let j = 1; j <= soCot; j++) {
            const randomLoaiGheId = loaiGheIds[Math.floor(Math.random() * loaiGheIds.length)]; // Chọn ngẫu nhiên loại ghế từ danh sách
            const ghe = new Ghe({
                phongchieu_id,
                hang, // Hàng ghế (ví dụ: A)
                cot: `${j}`, // Cột ghế (ví dụ: A1, A2...)
                loaighe_id: randomLoaiGheId
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
