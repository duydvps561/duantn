var express = require('express');
var router = express.Router();
const VeXemPhim = require('../models/VeXemPhim');

router.get('/', async function(req, res, next) {
  try {
    const veXemPhim = await VeXemPhim.find(); 
    res.json(veXemPhim);
  } catch (err) {
    next(err);
  }
});

router.post('/add', async (req, res) => {
  try {
    const veXemPhim = new VeXemPhim(req.body);
    const result = await veXemPhim.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;