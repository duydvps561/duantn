const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contacSchema = new Schema({
    Name: { type: String, required: true },
    email: { type: String, required: true},
    phone: { type: Number, required: true},
    contact: { type: String, required: true},
    trangthai: { type: Number, default: 1}
}, { timestamps: true });

module.exports = mongoose.model('contac', contacSchema);
