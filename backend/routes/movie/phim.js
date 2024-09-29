var express = require('express');
var router = express.Router();
const Phim = require('../../models/movie/phim');

router.get('/', async function(req, res, next) {
  try {
    const phim = await Phim.find(); 
    res.json(phim);
  } catch (err) {
    next(err);
  }
});

router.post('/add', async (req, res) => {
  try {
    const phim = new Phim(req.body);
    const result = await phim.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;