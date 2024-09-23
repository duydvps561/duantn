var express = require('express');
var router = express.Router();
const Food = require('../models/food');

router.get('/', async function(req, res, next) {
  try {
    const food = await Food.find(); 
    res.json(food);
  } catch (err) {
    next(err);
  }
});

router.post('/add', async (req, res) => {
  try {
    const food = new Food(req.body);
    const result = await food.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;