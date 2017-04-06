/**
 * Created by philic on 2017/3/18.
 */
var Book = require('../routes/db').book;
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



module.exports = router;