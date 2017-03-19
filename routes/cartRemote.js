/**
 * Created by philic on 2017/3/18.
 */
var Book = require('../routes/db').Book;
var express = require('express');
var router = express.Router();

router.post('/getBooksInCart', function(req, res, next) {
    console.log(req.body);
    var reqCart = req.body.ids;
    Book.find({_id: reqCart}, function(err, doc){
        if(err) return console.error(err);
        console.log(doc);
        res.send(doc);
    });
});

module.exports = router;