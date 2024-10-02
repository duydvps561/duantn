var express = require('express');
var router = express.Router();
const Taikhoan = require('../../models/account/taikhoan.js'); // Import the Taikhoan model

// lấy tất cả các tài khoản
router.get('/',async (rep,res,next)=>{
  try{
    const taikhoan= await Taikhoan.find();
    if(!taikhoan){
      return res.status(404).send({ error: 'Account not found' }); // Handle not found
    }
    res.json(taikhoan);
  }
  catch(err)
  {
    next(err)
  }
})

// lấy tài khoản theo id 
router.get('/:id',async(rep,res,next)=>{
  try{
    const taikhoan= await Taikhoan.findById(rep.params.id);
    if(!taikhoan){
      return res.status(404).send({ error: 'Account not found' }); // Handle not found
    }
    res.json(taikhoan);
  }catch(err){
    next(err)
  }
}
)

// thêm mới tài khoản
router.post('/add', async (req, res) => {
  try {
    const taikhoan = new Taikhoan(req.body); 
    const result = await taikhoan.save(); 
    res.status(201).send(result); 
  } catch (err) {
    res.status(500).send({ error: err.message }); 
  }
});

// cập nhật tài khoản theo id
router.put('/:id', async (req, res) => {
  try {
    const taikhoan = await Taikhoan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!taikhoan) {
      return res.status(404).send({ error: 'Account not found' }); 
    }
    res.json(taikhoan); 
  } catch (err) {
    res.status(500).send({ error: err.message }); 
  }
});

// xóa tài khoản theo id
router.delete('/:id', async (req, res) => {
  try {
    const taikhoan = await Taikhoan.findByIdAndDelete(req.params.id); 
    if (!taikhoan) {
      return res.status(404).send({ error: 'Account not found' }); 
    }
    res.status(200).send("xóa tài khoản thành công"); 
  } catch (err) {
    res.status(500).send({ error: err.message }); 
  }
});


module.exports = router;