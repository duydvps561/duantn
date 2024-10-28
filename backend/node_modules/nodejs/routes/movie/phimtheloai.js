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
// sửa 
router.put('/edit/:id', async (req, res) => {
  try {
    const phimtheloai = await Phimtheloai.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!phimtheloai) return res.status(404).send('The phim the loai with the given ID was not found.');
    res.send(phimtheloai);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
// xóa
router.delete('/delete/:id', async (req, res) => {
  try {
    const phimtheloai = await Phimtheloai.findByIdAndDelete(req.params.id);
    if (!phimtheloai) return res.status(404).send('The phim the loai with the given ID was not found.');
    res.send(phimtheloai);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
module.exports = router;