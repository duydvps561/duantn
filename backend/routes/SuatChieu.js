var express = require('express');
var router = express.Router();
const SuatChieu = require('../models/SuatChieu');

router.get('/', async function(req, res, next) {
  try {
    const suatChieu = await SuatChieu.find(); 
    res.json(suatChieu);
  } catch (err) {
    next(err);
  }
});

router.post('/add', async (req, res) => {
  try {
    const suatChieu = new SuatChieu(req.body);
    const result = await suatChieu.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;