var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/EMIS');

const partnerSchema = new mongoose.Schema({
    id: String,
    name: String,
})

const Partners = mongoose.model('partners', partnerSchema)

module.exports = Partners;