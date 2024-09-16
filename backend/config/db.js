const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const atlas = 'mongodb+srv://hau23022004:duantotnghiep1@canalisdb.l7b8nzd.mongodb.net/duantotnghiep';
// const atlas = 'mongodb://localhost:27017/.....';

const connect = async () => {
    try {
        await mongoose.connect(atlas);
        console.log('Connected successfully');
    } catch (err) {
        console.log('Connection error:', err);
    }
}

module.exports = { connect };