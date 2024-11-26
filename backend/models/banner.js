const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bannerSchema = new Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    type: { type: String, required: true }, // Renamed 'loai' to 'type'
    hidden: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Banner', bannerSchema);