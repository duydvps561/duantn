const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phongchieuSchema = new Schema({
    loaiphong_id: { type: Schema.Types.ObjectId, ref: 'loaiphong', required: true },
    tenphong: { type: String, required: true },
    trangthai: { type: String, default: '1' },
}, { timestamps: true });

module.exports = mongoose.model('phongchieu', phongchieuSchema);