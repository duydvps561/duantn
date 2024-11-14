const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phimtheloaiSchema = new Schema({
    phim_id: { type: Schema.Types.ObjectId, ref: 'Phim', required: true }, // Khóa ngoại
    theloai_id: { type: Schema.Types.ObjectId, ref: 'PhimTheLoai', required: true }, // Khóa ngoại
}, { timestamps: true });
phimtheloaiSchema.index({ phim_id: 1, theloai_id: 1 }, { unique: true });

module.exports = mongoose.model('phimtheloai', phimtheloaiSchema);

