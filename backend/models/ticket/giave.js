const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const giaveSchema = new Schema({
    giave: { type: Number, required: true },
    trangthai: { type: String, default: '1' },
}, { timestamps: true });

// Đảm bảo tên mô hình tuân theo quy tắc PascalCase
module.exports = mongoose.model('giave', giaveSchema);