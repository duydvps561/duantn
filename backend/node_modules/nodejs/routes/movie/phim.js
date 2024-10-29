var express = require('express');
var router = express.Router();
const multer = require('multer');
const Phim = require('../../models/movie/phim');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/img/phim')); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);  
  }
});
function checkFileUpload(req, file, cb) {
  const fileTypes = /\.(jpg|jpeg|png|gif)$/;
  if (!file.originalname.match(fileTypes)) {
    return cb(new Error('Bạn chỉ được upload file ảnh'));
  }
  cb(null, true);
}
const upload = multer({ 
  storage: storage, 
  fileFilter: checkFileUpload 
});

// lấy ra tất cả các phim 
router.get('/', async function(req, res, next) {
  try {
    const phim = await Phim.find(); 
    res.json(phim);
  } catch (err) {
    next(err);
  }
});
// lấy tất cả các phim có trạng thái là 1
 router.get('/dangchieu', async function(req, res, next) {
  try {
    const phim = await Phim.find({ trangthai: 1 }); 
    res.json(phim);
  } catch (err) {
    next(err);
  }
});
// lấy tất cả các phim có  trạng thái là 0
 router.get('/sapchieu', async function(req, res, next) {
  try {
    const phim = await Phim.find({ trangthai: 0 }); 
    res.json(phim);
  } catch (err) {
    next(err);
  }
});

// upload phim 
router.post('/add', upload.single('img'), async (req, res) => {
  try {
    const {
      tenphim,
      theloai,
      ngonngu,
      diemdanhgiavt,
      diemdanhgiamot,
      ngaykhoichieu,
      ngayhetHan,
      diemdanhgia,
      noidung,
    } = req.body; // Sử dụng req thay vì rep

    const img = req.file ? req.file.originalname : null; // Sử dụng req ở đây nữa

    const newpgim = {
      tenphim,
      theloai,
      ngonngu,
      diemdanhgiavt,
      diemdanhgiamot,
      ngaykhoichieu,
      ngayhetHan,
      diemdanhgia,
      noidung,
      img,
    };

    const result = await Phim.create(newpgim);
    res.status(201).send(result);
  } catch (err) {
    console.error(err); // Ghi lại lỗi để tiện kiểm tra
    res.status(500).send('Lỗi upload'); // Có thể cung cấp thông điệp lỗi rõ ràng hơn nếu cần
  }
});
//xóa phim
 router.delete('/:id', async (req, res) => {
  try {
    const result = await Phim.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send('The phim with the given ID was not found.');
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
//update phim
 router.put('/:id', async (req, res) => {
  try {
    const phim = await Phim.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!phim) return res.status(404).send('The phim with the given ID was not found.');
    res.send(phim);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//lấy phim theo id
 router.get('/:id', async (req, res) => {
  try {
    const phim = await Phim.findById(req.params.id);
    if (!phim) return res.status(404).send('The phim with the given ID was not found.');
    res.send(phim);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//tìm kiếm phim theo tên
 router.get('/:name', async (req, res) => {
  try {
    const phim = await Phim.find({ tenphim: new RegExp(req.params.name, 'i') });
    res.json(phim);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//lấy phim theo thể loại
 router.get('/theloai/:id', async (req, res) => {
  try {
    const phim = await Phim.find({ theloai: req.params.id });
    res.json(phim);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
module.exports = router;