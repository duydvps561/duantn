var express = require('express');
var router = express.Router();
const Phongchieu = require('../../models/room/phongchieu');

router.get('/', async function(req, res, next) {
  try {
    const phongchieu = await Phongchieu.find(); 
    res.json(phongchieu);
  } catch (err) {
    next(err);
  }
});

router.post('/add', async (req, res) => {
  try {
    const phongchieu = new Phongchieu(req.body);
    const result = await phongchieu.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;