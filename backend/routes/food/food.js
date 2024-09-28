var express = require('express');
var router = express.Router();
const Food = require('../../models/food/food'); // Ensure this path is correct

// GET all food items
router.get('/', async function(req, res, next) {
  try {
    const food = await Food.find(); 
    res.json(food);
  } catch (err) {
    next(err);
  }
});

// POST a new food item
router.post('/add', async (req, res) => {
  try {
    const food = new Food(req.body);
    const result = await food.save();
    res.status(201).send(result);
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;