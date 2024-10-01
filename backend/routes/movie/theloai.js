var express = require('express');
var router = express.Router();
const Theloai = require('../../models/movie/theloai');

router.get('/', async function(req, res, next) {
  try {
    const theloai = await Theloai.find(); 
    res.json(theloai);
  } catch (err) {
    next(err);
  }
});

router.post('/add', async (req, res) => {
  try {
    const theloai = new Theloai(req.body);
    const result = await theloai.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;