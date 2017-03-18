/**
 * Created by philic on 2017/3/18.
 */
var User = require('../routes/db').User;
var express = require('express');
var router = express.Router();

router.post('/checkUser', function(req, res, next) {
    console.log(req.body);
    var query = {
        account:  req.body.account,
        password: req.body.password
    };

    User.find(query, function(err, doc){
        if(err) return console.error(err);
        console.log(doc);
        //res.send(doc);
    });
});

module.exports = router;