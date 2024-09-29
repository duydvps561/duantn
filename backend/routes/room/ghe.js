var express = require('express');
var router = express.Router();
const Ghe = require('../../models/room/ghe');

router.get('/', async function(req, res, next) {
  try {
    const ghe = await Ghe.find(); 
    res.json(ghe);
  } catch (err) {
    next(err);
  }
});

router.post('/add', async (req, res) => {
  try {
    const ghe = new Ghe(req.body);
    const result = await ghe.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;