var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/EMIS');

const usersSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: Number
})

const Users = mongoose.model('users', usersSchema)

module.exports = Users;