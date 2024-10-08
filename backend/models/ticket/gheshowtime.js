const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gheshowtimeSchema = new Schema({
    ghe_id: { type: Schema.Types.ObjectId, ref: 'ghe', required: true }, 
    cachieu_id: { type: Schema.Types.ObjectId, ref: 'cachieu', required: true }, 
    trangthai: { type: String, default: '1' },
}, { timestamps: true });


module.exports = mongoose.model('gheshowtime', gheshowtimeSchema);