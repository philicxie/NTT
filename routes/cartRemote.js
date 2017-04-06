/**
 * Created by philic on 2017/3/18.
 */
var Book = require('../routes/db').book;
var Token = require('../routes/db').token;
var Order = require('../routes/db').order;
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

router.post('/newBill', function(req, res, next) {
    var hasToken = function(item) {
        Token.find({token: item}, function(err, doc){
            return (doc.length !== 0);
        });
    };
    var temToken = 0;
    do {
        temToken = Math.floor(Math.random()*(1<<17));
    } while(hasToken(temToken));
    console.log(temToken);
    var tokenItem = new Token({
        token: temToken,
        time: new Date(),
        status: 0
    });
    tokenItem.save(function(err, doc){
        console.log(doc);
        res.send(doc);
    });
});

router.post('/commitBill', function(req, res, next) {
    console.log(req.body);
});

module.exports = router;