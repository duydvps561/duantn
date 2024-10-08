var express = require('express');
var router = express.Router();
const Giaghe = require('../../models/room/giaghe');

router.get('/', async function(req, res, next) {
  try {
    const giaghe = await Giaghe.find(); 
    res.json(giaghe);
  } catch (err) {
    next(err);
  }
});

router.post('/add', async (req, res) => {
  try {
    const giaghe = new Giaghe(req.body);
    const result = await giaghe.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// xóa giá vé đã cũ

router.delete('/:id', async (rep,res,next)=>{
  try{
    const giaghe= await Giaghe.findByIdAndDelete(rep.params.id);
    if(!giaghe){
      return res.status(404).send({error:'Giá vé không tồn tại'});
    }
    res.json(giaghe);
  }catch(err){
    next(err);
  }
})

module.exports = router;