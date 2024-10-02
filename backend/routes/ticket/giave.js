var express = require('express');
var router = express.Router();
const Giave = require('../../models/ticket/giave');

router.get('/', async function(req, res, next) {
  try {
    const giave = await Giave.find(); 
    res.json(giave);
  } catch (err) {
    next(err);
  }
});

router.post('/add', async (req, res) => {
  try {
    const giave = new Giave(req.body);
    const result = await giave.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// xóa giá vé đã cũ

router.delete('/:id', async (rep,res,next)=>{
  try{
    const giave= await Giave.findByIdAndDelete(rep.params.id);
    if(!giave){
      return res.status(404).send({error:'Giá vé không tồn tại'});
    }
    res.json(giave);
  }catch(err){
    next(err);
  }
})

module.exports = router;