const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const theloaiSchema = new Schema({
    tentheloai: { type: String, required: true }, // Ngày lập nên là Date
    trangthai: { type: String, default: '1' },
}, { timestamps: true });

// Đảm bảo tên mô hình tuân theo quy tắc PascalCase
module.exports = mongoose.model('theloai', theloaiSchema);