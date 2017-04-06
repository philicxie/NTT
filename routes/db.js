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
    key: String,
    user: String,
    books: mongoose.Schema.Types.Mixed,
    time: Date,
    status: Number //[0: init, 1: unpay, 2: queued]
});

var tokenSchema = mongoose.Schema({
    token: Number,
    time: Date,
    status: Number //[0: ok, 1: inused, 2: timeout]
});


module.exports.book = mongoose.model('Books', bookSchema);

module.exports.user = mongoose.model('Users', userSchema);

module.exports.order = mongoose.model('Orders', orderSchema);

module.exports.token = mongoose.model('Tokens', tokenSchema);