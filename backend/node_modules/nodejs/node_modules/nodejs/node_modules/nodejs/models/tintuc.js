const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tintucSchema = new Schema({
    title: { type: String, required: true },
    describe: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    view: { type: Number, default: 0 },
    loai: { type: String, default: 'Tin tức' }, 
    trangthai: { type: String, default: 'Hiện' }, 
}, { timestamps: true });

module.exports = mongoose.model('tintuc', tintucSchema);
