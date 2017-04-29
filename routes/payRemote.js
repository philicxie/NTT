/**
 * Created by philic on 2017/3/18.
 */
var mongo = require('../routes/db').mongo;
var Book = require('../routes/db').book;
var Transaction = require('mongoose-transaction')(mongo);

var Order = require('../routes/db').order;
var express = require('express');
var router = express.Router();

router.post('/getOrderByKey', function(req, res, next) {
    console.log(req.body);
    Order.find({key: req.body.key}, function(err, doc){
        if(err) return console.error(err);
        console.log(doc);
        res.send(doc[0]);
    });
});

router.post('/payOrderByKey', function(req, res, next) {
    var transaction = new Transaction();
    Order.find({key: req.body.key}, function(err, doc){         // Read Info from Order table
        if(err) {
            res.send({code: 300});                              // Internal error
            return console.error(err);
        } else {
            doc[0].books,map(function(book) {
                Book.find({_id: book.id}, function(err, doc) {  // For every book in order, update storage info
                    if(doc[0].count < book.count) {
                        res.send({code: 301});                  // Book storage not enough
                        return console.error(err);
                    } else {
                        transaction.update('Book', book.id, {count: doc[0].count - book.count});
                    }
                });
            });
            transaction.update('Order', req.body.key, {status: "PAID"});
            transaction.run(function(err, doc) {
                if(err) {
                    res.send({code: 300});
                    return console.error(err);
                } else {
                    res.send({code: 200});                      // Ok
                }
            });
        }
    });
});



module.exports = router;