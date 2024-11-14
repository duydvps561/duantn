const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foododerSchema = new Schema({    
    food_id: { type: Schema.Types.ObjectId, ref: 'food', required: true },
    hoadon_id: { type: Schema.Types.ObjectId, ref: 'hoadon', required: true },
    soluong:{type: Number,required:true},
    tongtien:{type: Number,required:true},
}, { timestamps: true });

module.exports = mongoose.model('foododer', foododerSchema);