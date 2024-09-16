const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VeXemPhimSchema = new Schema({
    maShachHang: { type: Schema.Types.ObjectId, ref: 'KhachHang', required: true },
    maSuatChieu: { type: Schema.Types.ObjectId, ref: 'SuatChieu', required: true },
    maGheNgoi: { type: Schema.Types.ObjectId, ref: 'GheNgoi', required: true },
    soLuong: { type: Number, required: true },
    tongThanhTien: { type: Number, required: true },
    maThanhToan: { type: Schema.Types.ObjectId, ref: 'ThanhToan', required: true },
    thoiGianDatVe: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('VeXemPhim', VeXemPhimSchema);
