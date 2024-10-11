var express = require('express');
var router = express.Router();
const Giaghe = require('../../models/room/giaghe');
const Loaighe = require('../../models/room/loaighe'); // Import model Loaighe để lấy tên loại ghế

// Get all Gia Ghe
router.get('/', async (req, res) => {
  try {
    const giagheList = await Giaghe.find().populate('loaighe_id', 'loaighe');
    res.json(giagheList);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const giagheId = req.params.id;
    const giaghe = await Giaghe.findById(giagheId).populate('loaighe_id', 'loaighe');
    if (!giaghe) {
      return res.status(404).send({ error: 'Giá ghế không tồn tại' });
    }
    res.json(giaghe);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


router.post('/add', async (req, res) => {
  try {
    const { loaighe_id, giaghe } = req.body;

    const loaighe = await Loaighe.findById(loaighe_id);
    if (!loaighe) {
      return res.status(404).send({ error: 'Loại ghế không tồn tại' });
    }

    const newGiaghe = new Giaghe({ loaighe_id, giaghe });
    const result = await newGiaghe.save();
    
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { loaighe_id, giaghe } = req.body;

    const giagheData = await Giaghe.findById(id);
    if (!giagheData) {
      return res.status(404).send({ error: 'Giá ghế không tồn tại' });
    }

    giagheData.loaighe_id = loaighe_id || giagheData.loaighe_id;
    giagheData.giaghe = giaghe || giagheData.giaghe;

    const updatedGiaghe = await giagheData.save();
    res.status(200).send(updatedGiaghe);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const giaghe = await Giaghe.findByIdAndDelete(id);
    if (!giaghe) {
      return res.status(404).send({ error: 'Giá ghế không tồn tại' });
    }
    res.status(200).send({ message: 'Giá ghế đã được xóa' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;