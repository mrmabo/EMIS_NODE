const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/EMIS');

const productSchema = new mongoose.Schema({
    name: String
})

const Products = mongoose.model('products', productSchema);

module.exports = Products;