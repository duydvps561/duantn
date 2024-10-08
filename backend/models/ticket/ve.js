const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const veSchema = new Schema({
    cachieu_id: { type: Schema.Types.ObjectId, ref: 'cachieu', required: true  },
    gheshowtime_id: { type: Schema.Types.ObjectId, ref: 'gheshowtime', required: true  },
    trangthai: { type: String, default: "1" },
}, { timestamps: true });

module.exports = mongoose.model('ve', veSchema);