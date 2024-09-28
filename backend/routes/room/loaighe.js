var express = require('express');
var router = express.Router();
const Loaighe = require('../../models/room/loaighe');

router.get('/', async function(req, res, next) {
  try {
    const loaighe = await Loaighe.find(); 
    res.json(loaighe);
  } catch (err) {
    next(err);
  }
});

router.post('/add', async (req, res) => {
  try {
    const loaighe = new Loaighe(req.body);
    const result = await loaighe.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;