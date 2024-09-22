const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const atlas = 'mongodb+srv://duantotnghiep:duantotnghiep@duantotnghiep.8tblu.mongodb.net/duantotnghiep';
// const atlas = 'mongodb://localhost:27017/.....';
const connect = async () => {
    try {
        await mongoose.connect(atlas);
        console.log('kết nói thành công');
    } catch (err) {
        console.log('Connection error:', err);
    }
}

module.exports = { connect };