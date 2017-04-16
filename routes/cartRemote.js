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

router.post('/createBill', function(req, res, next) {
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
    Token.find({token: req.body.token}, function (err, doc) {
        if(err) {
            res.send({code: 300});
        } else if(doc.length != 1) {
            res.send({code: 301});
        } else {
            var createTime = doc[0].time.getTime();
            var commitTime = new Date(req.body.time).getTime();
            if(commitTime - createTime > 60*1000 || commitTime < createTime) {
                res.send({code: 302}); // Time out or exception
            } else {
                var initBooks = [];
                var orderPrice = 0;
                req.body.books.map(function (item) {
                    initBooks.push({
                        book: item.book,
                        count: item.count
                    });
                    orderPrice += item.book.price * item.count;
                });
                orderPrice = Math.round(orderPrice*100)/100;
                var initOrder = new Order({
                    key: req.body.key,
                    user: req.body.userId,
                    time: req.body.time,
                    books: initBooks,
                    price: orderPrice,
                    status: 0
                });
                console.log(initOrder);
                var transaction = require('./transaction');
                transaction(db)
                    .step(function(t, context, next) {
                        t.collection('books').findAndModify({ _id: initOrder.books.id }, function(err, doc) {
                            if (err) return next(err);
                            if(doc[0].count>0) {
                                doc[0].count = doc[0] - initOrder.books.count;
                            }
                        });

                    })
                    .step(function(t, context, next) {
                        t.collection('orders').findAndModify({ _id: initOrder.key }, function(err, doc) {
                            if (err) return next(err);
                            doc[0].status = 1;
                        });
                    });
                initOrder.save(function (err, doc) {
                    if(err) {
                        res.send({code: 303});
                    } else {
                        res.send({
                            code: 200
                        });
                    }
                });
            }
        }
    });
});

router.post('/confirmBill', function(req, res, next) {
    console.log(req.body);
    Order.find({key: req.body.key}, function(err, doc) {
        if(err) res.send({code: 300});
        if(doc[0].status === 0) {
            doc[0].status = 1;
            doc[0].save();
            res.send({code: 200});
        } else {
            res.send({code: 301});
        }
    });
});

module.exports = router;