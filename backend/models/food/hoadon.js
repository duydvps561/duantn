const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hoadonSchema = new Schema({
    taikhoan_id: { type: Schema.Types.ObjectId, ref: 'taikhoan', required: true }, // Sử dụng ObjectId cho liên kết
    ngaylap: { type: Date, required: true }, // Ngày lập nên là Date
    giolap: { type: String, required: true }, // Giờ lập không cần unique
    tongtien: { type: Number, required: true }, // Đổi sang Number để dễ tính toán
    trangthai: { type: String, default: '1' },
}, { timestamps: true });

// Đảm bảo tên mô hình tuân theo quy tắc PascalCase
module.exports = mongoose.model('hoadon', hoadonSchema);