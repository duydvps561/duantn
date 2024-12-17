var express = require('express');
var router = express.Router();
const FoodOder = require('../../models/food/foododer');

router.get('/', async function(req, res, next) {
  try {
    const foododer = await FoodOder.find(); 
    res.json(foododer);
  } catch (err) {
    next(err);
  }
});
router.get('/:id', async function(req, res, next) {
  try {
    // Tìm món ăn theo hoadon_id
    const foododer = await FoodOder.find({ hoadon_id: req.params.id })
      .populate("food_id", "tenfood gia") // Lấy thông tin món ăn (tenfood, gia)
      .populate("hoadon_id", "tongtien createdAt"); // Lấy thông tin hóa đơn (tongtien, createdAt)

    if (!foododer || foododer.length === 0) {
      return res.status(404).send({ message: "Không có món ăn cho hóa đơn này" });
    }
    
    res.json(foododer);
  } catch (err) {
    next(err);
  }
});

router.post('/add', async (req, res) => {
  try {
    const foododer = new FoodOder(req.body);
    const result = await foododer.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;