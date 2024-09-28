var express = require('express');
var router = express.Router();
const Taikhoan = require('../../models/account/taikhoan.js');

router.get('/', async function(req, res, next) {
  try {
    const taikhoan = await Taikhoan.find(); 
    res.json(taikhoan);
  } catch (err) {
    next(err);
  }
});

router.post('/add', async (req, res) => {
  try {
    const taikhoan = new Taikhoan(req.body);
    const result = await taikhoan.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;