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