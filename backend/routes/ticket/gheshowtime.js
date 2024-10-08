var express = require('express');
var router = express.Router();
const Gheshowtime = require('../../models/ticket/gheshowtime');

router.get('/', async function(req, res, next) {
  try {
    const gheshowtime = await Gheshowtime.find(); 
    res.json(gheshowtime);
  } catch (err) {
    next(err);
  }
});

router.post('/add', async (req, res) => {
  try {
    const gheshowtime = new Gheshowtime(req.body);
    const result = await gheshowtime.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;