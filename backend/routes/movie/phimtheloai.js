var express = require('express');
var router = express.Router();
const Phimtheloai = require('../../models/movie/phimtheloai');

// Create a new phimtheloai
router.post('/', async (req, res) => {
    try {
        const phimTheLoai = new Phimtheloai(req.body);
        await phimTheLoai.save();
        res.status(201).send(phimTheLoai);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all phimtheloai
router.get('/', async (req, res) => {
    try {
        const phimTheLoais = await Phimtheloai.find().populate('phim_id theloai_id');
        res.status(200).send(phimTheLoais);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a phimtheloai by ID
router.get('/:id', async (req, res) => {
    try {
        const phimTheLoai = await Phimtheloai.findById(req.params.id).populate('phim_id theloai_id');
        if (!phimTheLoai) {
            return res.status(404).send();
        }
        res.status(200).send(phimTheLoai);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a phimtheloai by ID
router.patch('/:id', async (req, res) => {
    try {
        const phimTheLoai = await Phimtheloai.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!phimTheLoai) {
            return res.status(404).send();
        }
        res.status(200).send(phimTheLoai);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a phimtheloai by ID
router.delete('/:id', async (req, res) => {
    try {
        const phimTheLoai = await Phimtheloai.findByIdAndDelete(req.params.id);
        if (!phimTheLoai) {
            return res.status(404).send();
        }
        res.status(200).send(phimTheLoai);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;