var express = require('express');
var router = express.Router();
const Ve = require('../../models/ticket/ve');

router.get('/', async function(req, res, next) {
  try {
    const ve = await Ve.find(); 
    res.json(ve);
  } catch (err) {
    next(err);
  }
});

router.post('/add', async (req, res) => {
  try {
    const ve = new Ve(req.body);
    const result = await ve.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;