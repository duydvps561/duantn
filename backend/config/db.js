const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const atlas = 'mongodb+srv://duantotnghiep:0337221649hau@duantotnghiep.hagmok9.mongodb.net/duantotnghiep';
// const atlas = 'mongodb://localhost:27017/.....';
const connect = async () => {
    try {
        await mongoose.connect(atlas, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected successfully');
    } catch (err) {
        console.log(err);
    }
}

module.exports = { connect };
