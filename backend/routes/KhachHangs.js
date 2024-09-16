var express = require('express');
var router = express.Router();
const KhachHang = require('../models/KhachHang');

function generateMaKhachHang() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; 
  let maKhachHang = 'KH';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    maKhachHang += characters[randomIndex];
  }

  return maKhachHang;
}
router.get('/', async function(req, res, next) {
  try {
    const khachHang = await KhachHang.find(); 
    res.json(khachHang);
  } catch (err) {
    next(err);
  }
});

router.post('/add', async (req, res) => {
  try {
    const khachHangData = req.body;

    let isUnique = false;
    let maKhachHang = '';


    while (!isUnique) {
      maKhachHang = generateMaKhachHang();
      const existingKhachHang = await KhachHang.findOne({ maKhachHang });
      if (!existingKhachHang) {
        isUnique = true;
      }
    }

    khachHangData.maKhachHang = maKhachHang;

    const newKhachHang = new KhachHang(khachHangData);
    const result = await newKhachHang.save();

    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
