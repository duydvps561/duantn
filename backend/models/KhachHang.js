const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KhachHangSchema = new Schema({
  maKhachHang: { type: String, required: true, unique: true }, 
  tenKhachHang: { type: String, required: true },
  emailKhachHang: { type: String, required: true },
  sdtKhachHang: { type: String, required: true },
  diaChiKhachHang: { type: String },
  gioiTinh: { type: String },
  ngaySinh: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('KhachHang', KhachHangSchema);