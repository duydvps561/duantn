const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    tenfood:{type: String,required:true},
    img:{type: String,required:true},
    soluong:{type: Number,required:true},
    loai:{type: String,required:true},
    gia:{type: Number,required:true},
    trangthai: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('food', foodSchema);