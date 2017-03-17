/**
 * Created by philic on 2017/3/15.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BookStore');

var bookSchema = mongoose.Schema({
    name: String,
    category: String,
    author: String,
    ISBN: String,
    price: Number,
    url: String
});

var userSchema = mongoose.Schema({
    name: String,
    account: String,
    password: String,
    phone: String
})

module.exports.Book = mongoose.model('Books', bookSchema);

module.exports.User = mongoose.model('Users', userSchema);