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

module.exports = router;