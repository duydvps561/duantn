const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuatChieuSchema = new Schema({
    maPhongChieuPhim: { type: String, required: true },
    ngayChieuPhim: { type: Date, required: true },
    khungGio: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('SuatChieu', SuatChieuSchema);
