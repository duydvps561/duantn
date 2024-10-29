const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phimSchema = new Schema({
    tenphim: { type: String, required: true }, // Tên phim không cần unique
    noidung: { type: String, required: true},
    thoiluong: { type: String, required: true},
    daodien: { type: String, required: true }, // Ngày lập nên là Date
    dienvien: { type: String, required: true }, // Ngày lập nên là Date
    trailler: { type: String, required: true }, // Ngày lập nên là Date
    ngayhieuluc: { type: Date, required: true }, // Giờ lập không cần unique
    ngayhieulucden: { type: Date, required: true }, // Giờ lập không cần unique
    img: { type: String, required: true }, // Giờ lập không cần unique
    trangthai: { type: String, default: '1' },
}, { timestamps: true });

// Đảm bảo tên mô hình tuân theo quy tắc PascalCase
module.exports = mongoose.model('phim', phimSchema);