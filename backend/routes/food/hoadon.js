var express = require('express');
var router = express.Router();
const Hoadon = require('../../models/food/hoadon');

router.get('/', async function(req, res, next) {
  try {
    const hoadon = await Hoadon.find(); 
    res.json(hoadon);
  } catch (err) {
    next(err);
  }
});
router.post('/add', async (req, res) => {
  try {
    const hoadon = new Hoadon(req.body);
    const result = await hoadon.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
// lấy hóa đơn theo id 

router.get('/:id', async (req, res) => {
  try {
    const hoadon = await Hoadon.findById(req.params.id);
    res.json(hoadon);
  } catch (err) {
    res.status(404).send({ message: 'Hóa đơn không tồn tại' });
  }
});
// chi tiết hóa đơn

router.get('/:id/details', async (req, res) => {
  try {
    const hoadon = await Hoadon.findById(req.params.id);
    if (!hoadon) {
      return res.status(404).send({ message: 'Hóa đơn không tồn tại' });
    }
    res.json(hoadon.details);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}); 
// xóa hóa đơn

// router.delete('/all', async (req, res) => {
//   try {
//     const result = await Hoadon.deleteMany();
//     if (result.deletedCount === 0) {
//       return res.status(404).send({ message: 'Không có hóa đơn nào để xóa' });
//     }
//     res.status(200).send({ message: 'Đã xóa tất cả hóa đơn thành công' });
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });
router.delete('/:id', async (req, res) => {
  try {
    const hoadon = await Hoadon.findByIdAndDelete(req.params.id);
    if (!hoadon) {
      return res.status(404).send({ message: 'Hóa đơn không tồn tại' });
    }
    res.status(200).send({ message: 'Hóa đơn đã xóa thành công' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// cập nhật hóa đơn
router.put('/:id', async (req, res) => {
  try {
    const hoadon = await Hoadon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hoadon) {
      return res.status(404).send({ message: 'Hóa đơn không tồn tại' });
    }
    res.json(hoadon);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
module.exports = router;