/**
 * Created by philic on 2017/3/18.
 */
var Book = require('../routes/db').book;
var express = require('express');
var router = express.Router();

router.post('/getBooksByCate', function(req, res, next) {
    console.log(req.body);
    var reqCate = req.body.category;
    Book.find({category: reqCate}, function(err, doc){
        if(err) return console.error(err);
        console.log(doc);
        res.send(doc);
    });
});

module.exports = router;