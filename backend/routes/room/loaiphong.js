var express = require('express');
var router = express.Router();
const Loaiphong = require('../../models/room/loaiphong');

router.get('/', async function(req, res, next) {
  try {
    const loaiphong = await Loaiphong.find(); 
    res.json(loaiphong);
  } catch (err) {
    next(err);
  }
});

router.post('/add', async (req, res) => {
  try {
    const loaiphong = new Loaiphong(req.body);
    const result = await loaiphong.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;