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
//xóa phim
 router.delete('/:id', async (req, res) => {
  try {
    const result = await Phim.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send('The phim with the given ID was not found.');
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//update phim
 router.put('/:id', async (req, res) => {
  try {
    const phim = await Phim.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!phim) return res.status(404).send('The phim with the given ID was not found.');
    res.send(phim);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//lấy phim theo id
 router.get('/:id', async (req, res) => {
  try {
    const phim = await Phim.findById(req.params.id);
    if (!phim) return res.status(404).send('The phim with the given ID was not found.');
    res.send(phim);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//tìm kiếm phim theo tên
 router.get('/:name', async (req, res) => {
  try {
    const phim = await Phim.find({ tenphim: new RegExp(req.params.name, 'i') });
    res.json(phim);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//lấy phim theo thể loại
 router.get('/theloai/:id', async (req, res) => {
  try {
    const phim = await Phim.find({ theloai: req.params.id });
    res.json(phim);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
module.exports = router;