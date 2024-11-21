const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const veSchema = new Schema({
    cachieu_id: { type: Schema.Types.ObjectId, ref: 'cachieu', required: true  },
    hoadon_id: { type: Schema.Types.ObjectId, ref: 'cachieu', required: true  },
    ghe_id: [{type: Schema.Types.ObjectId, ref: 'cachieu', required: true  }],
    giave:{type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('ve', veSchema);