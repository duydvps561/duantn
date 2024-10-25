var express = require('express');
var router = express.Router();
const Cachieu = require('../../models/ticket/cachieu');

router.get('/', async function(req, res, next) {
  try {
    const cachieu = await Cachieu.find(); 
    res.json(cachieu);
  } catch (err) {
    next(err);
  }
});
router.get('/phim/:phimId/ngay/:ngay', async (req, res, next) => {
  try {
    const phimId = req.params.phimId;
    const ngay = new Date(req.params.ngay); 
    const cachieu = await Cachieu.find({ phim_id: phimId, ngaychieu: ngay });
    res.json(cachieu);
  } catch (err) {
    next(err);
  }
});
router.post('/add', async (req, res) => {
  try {
    const cachieu = new Cachieu(req.body);
    const result = await cachieu.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;