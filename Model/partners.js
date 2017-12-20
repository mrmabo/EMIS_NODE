var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/EMIS');

const partnerSchema = new mongoose.Schema({
    name: String,
})

const Partners = mongoose.model('partners', partnerSchema)

module.exports = Partners;