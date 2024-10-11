const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const giagheSchema = new Schema({
    loaighe_id:{ type: Schema.Types.ObjectId, ref: 'loaighe', required: true },
    giaghe: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('giaghe', giagheSchema);