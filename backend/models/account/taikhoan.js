const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taikhoanSchema = new Schema({
    tentaikhoan: { type: String, required: true },
    gioitinh: { type: String, required: true, enum: ['Nam', 'Nữ', 'Khác'] }, // Giới tính có thể có những giá trị cụ thể
    sdt: { type: String, required: true }, // SDT nên là String để chứa số 0
    ngaysinh: { type: Date, required: true }, // Ngày sinh nên là Date
    email: { type: String, unique: true, required: true }, // Thêm required
    matkhau: { type: String, required: true }, // Mật khẩu nên là String
    trangthai: { type: String, default: '1' }, // Đặt giá trị mặc định là chuỗi
    img: { type: String, default: '' }, // Đặt giá trị mặc định là chuỗi rỗng
    vaitro: { type: String, default: '' } // Đặt giá trị mặc định là chuỗi rỗng
}, { timestamps: true });

module.exports = mongoose.model('taikhoan', taikhoanSchema); 