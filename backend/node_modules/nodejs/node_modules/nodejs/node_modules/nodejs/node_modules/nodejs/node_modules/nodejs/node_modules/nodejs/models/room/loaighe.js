const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loaigheSchema = new Schema({
    loaighe: { type: String, required: true },
    mau: { type: String,required: true },
}, { timestamps: true });
module.exports = mongoose.model('loaighe', loaigheSchema);