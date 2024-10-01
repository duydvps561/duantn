const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gheSchema = new Schema({
    phongchieu_id: { type: Schema.Types.ObjectId, ref: 'phongchieu', required: true }, // Sử dụng ObjectId cho liên kết
    loaighe_id: { type: Schema.Types.ObjectId, ref: 'loaighe', required: true }, // Sử dụng ObjectId cho liên kết
    hang: { type: String, required: true },
    cot: { type: String, required: true },
    trangthai: { type: String, default: '1' },
}, { timestamps: true });
module.exports = mongoose.model('ghe', gheSchema);