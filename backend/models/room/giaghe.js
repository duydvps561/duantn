const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const giagheSchema = new Schema({
    loaighe_id:{ type: Schema.Types.ObjectId, ref: 'loaighe', required: true },
    giaghe: { type: Number, required: true },
    giobatdau: { type: Date, required: true }, 
    gioketthuc: { type: Date, required: true }, 
    trangthai: { type: Number, required: true ,default: 1  },
}, { timestamps: true });

module.exports = mongoose.model('giaghe', giagheSchema);