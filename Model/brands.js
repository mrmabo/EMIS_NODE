const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/EMIS');

const brandSchema = new mongoose.Schema({
    name: String,
    pid: mongoose.Schema.ObjectId
})

const Brands = mongoose.model('brands', brandSchema);

module.exports = Brands;