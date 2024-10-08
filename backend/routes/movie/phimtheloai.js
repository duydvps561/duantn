var express = require('express');
var router = express.Router();
const Phimtheloai = require('../../models/movie/phimtheloai');

router.get('/', async function(req, res, next) {
  try {
    const phimtheloai = await Phimtheloai.find(); 
    res.json(phimtheloai);
  } catch (err) {
    next(err);
  }
});
router.post('/add', async (req, res) => {
  try {
    const phimtheloai = new Phimtheloai(req.body);
    const result = await phimtheloai.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;