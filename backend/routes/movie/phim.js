var express = require('express');
var router = express.Router();
const Phim = require('../../models/movie/phim');


// lấy ra tất cả các phim 
router.get('/', async function(req, res, next) {
  try {
    const phim = await Phim.find(); 
    res.json(phim);
  } catch (err) {
    next(err);
  }
});
// lấy tất cả các phim có trạng thái là 1
 router.get('/dangchieu', async function(req, res, next) {
  try {
    const phim = await Phim.find({ trangthai: 1 }); 
    res.json(phim);
  } catch (err) {
    next(err);
  }
});
// lấy tất cả các phim có  trạng thái là 0
 router.get('/sapchieu', async function(req, res, next) {
  try {
    const phim = await Phim.find({ trangthai: 0 }); 
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