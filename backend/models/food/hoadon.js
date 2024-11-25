const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const hoadonSchema = new Schema({
  taikhoan_id: { type: Schema.Types.ObjectId, ref: 'taikhoan', required: true },
  ngaylap: { type: Date, required: true },
  giolap: { type: String, required: true },
  tongtien: { type: Number, required: true },
  trangthai: { type: String, default: '1' },
  details: [foodItemSchema],  // New field for order details (food items, prices)
}, { timestamps: true });

module.exports = mongoose.model('hoadon', hoadonSchema);
