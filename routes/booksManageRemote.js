/**
 * Created by philic on 2017/4/6.
 */

var Book = require('../routes/db').book;
var express = require('express');
var router = express.Router();

router.post('/getBooksByCates', function(req, res, next) {
    console.log(req.body);
    var reqCates = req.body.category;
    Book.find({category: reqCates}, function(err, doc){
        if(err) return console.error(err);
        console.log(doc);
        res.send(doc);
    });
});

module.exports = router;