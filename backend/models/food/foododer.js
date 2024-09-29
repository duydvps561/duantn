const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foododerSchema = new Schema({
    food_id: { type: Schema.Types.ObjectId, ref: 'food', required: true }, // Sử dụng ObjectId cho liên kết
    soluong:{type: Number,required:true},
    tongtien:{type: Number,required:true},
}, { timestamps: true });

module.exports = mongoose.model('foododer', foododerSchema);