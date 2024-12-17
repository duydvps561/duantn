const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cachieuSchema = new Schema({
    phongchieu_id: { type: Schema.Types.ObjectId, ref: 'PhongChieu', required: true }, // Sử dụng ObjectId cho liên kết
    phim_id: { type: Schema.Types.ObjectId, ref: 'phim', required: true }, // Sử dụng ObjectId cho liên kết
    ngaychieu: { type: Date, required: true }, // Ngày lập nên là Date
    giobatdau: { type: String, required: true }, // Giờ lập không cần unique
    gioketthuc: { type: String, required: true }, // Giờ lập không cần unique
    trangthai: { type: String, default: '1' },
}, { timestamps: true });

// Đảm bảo tên mô hình tuân theo quy tắc PascalCase
module.exports = mongoose.model('cachieu', cachieuSchema);