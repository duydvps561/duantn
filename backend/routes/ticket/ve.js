var express = require('express');
var router = express.Router();
const Ve = require('../../models/ticket/ve');

router.get('/', async function(req, res, next) {
  try {
    const ve = await Ve.find(); 
    res.json(ve);
  } catch (err) {
    next(err);
  }
});

router.delete('/all', async (req, res) => {
  try {
    const result = await Ve.deleteMany();
    if (result.deletedCount === 0) {
      return res.status(404).send({ message: 'Không có ve nào để xóa' });
    }
    res.status(200).send({ message: 'Đã xóa tất cả ve thành công' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const ve = await Ve.findById(req.params.id);
    if (!ve) {
      return res.status(404).send({ message: 'Không tìm thấy vé' });
    }
    res.json(ve);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get('/hoadon/:hoadon_id', async (req, res) => {
  try {
   
    const ve = await Ve.find({ hoadon_id: req.params.hoadon_id })
      .populate({
        path: 'cachieu_id',  // Tìm thông tin lịch chiếu
        select: 'giobatdau gioketthuc ngaychieu phim_id'  // Chọn các trường cần thiết
      });

    if (!ve || ve.length === 0) {
      return res.status(404).send({ message: 'Không tìm thấy vé cho hóa đơn này' });
    }

    res.json(ve);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
router.post('/add', async (req, res) => {
  try {
    const ve = new Ve(req.body);
    const result = await ve.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const ve = await Ve.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
    if (!ve) {
      return res.status(404).send({ message: 'Không tìm thấy vé để cập nhật' });
    }

    res.status(200).send({ message: 'Cập nhật vé thành công', data: ve });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;