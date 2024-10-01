const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loaiphongSchema = new Schema({
    loaiphong: { type: String, required: true },
    trangthai: { type: String, default: '1' },
}, { timestamps: true });
module.exports = mongoose.model('loaiphong', loaiphongSchema);