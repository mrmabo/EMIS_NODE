var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const booksSchema = new mongoose.Schema({
    name: String,
    price: Number
})

const Books = mongoose.model('books', booksSchema)

booksSchema.methods.get = () => {
    return this.name + this.price
}

module.exports = Books;