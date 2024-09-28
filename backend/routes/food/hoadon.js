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

module.exports = router;