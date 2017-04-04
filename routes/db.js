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
    phone: String,
    address: String,
    auth_code: Number
});

var orderSchema = mongoose.Schema({
    index: Number,
    key: String,
    user: String,
    books: [String],
    time: Date,
    status: Number
});


module.exports.book = mongoose.model('Books', bookSchema);

module.exports.user = mongoose.model('Users', userSchema);

module.exports.order = mongoose.model('Orders', orderSchema);