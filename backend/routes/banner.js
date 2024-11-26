const express = require('express');
const router = express.Router();
const multer = require('multer');
const Banner = require('../models/banner');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/banner');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

function checkFileUpLoad(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Bạn chỉ được upload file ảnh'));
    }
    cb(null, true);
}

const upload = multer({ storage: storage, fileFilter: checkFileUpLoad });

// Get all banners
router.get('/', async (req, res, next) => {
    try {
        const banners = await Banner.find();
        res.json(banners);
    } catch (err) {
        next(err);
    }
});

// Create a new banner
router.post('/add', upload.single('image'), async (req, res) => {
    const { name, type } = req.body;
    const img = req.file ? req.file.filename : null;

    if (!name || !img || !type) {
        return res.status(400).send('Name, image, and type are required');
    }

    const bannerData = {
        name,
        img,
        type,
        hidden: req.body.hidden === 'true'
    };

    try {
        const newBanner = new Banner(bannerData);
        await newBanner.save();
        res.status(201).send('Banner added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Update an existing banner
router.patch('/update/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { name, type } = req.body;
    const updates = {};
    
    if (name) updates.name = name;
    if (type) updates.type = type;
    if (req.file) updates.img = req.file.filename;
    if (req.body.hidden !== undefined) updates.hidden = req.body.hidden;

    try {
        const updatedBanner = await Banner.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedBanner) {
            return res.status(404).send('Banner not found');
        }
        res.status(200).json(updatedBanner); // Trả về banner đã cập nhật
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Delete a banner
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBanner = await Banner.findByIdAndDelete(id);
        if (!deletedBanner) {
            return res.status(404).send('Banner not found');
        }
        res.status(200).send('Banner deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;