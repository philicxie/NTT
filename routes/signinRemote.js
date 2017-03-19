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
        if(doc.length===1) {
            res.send({code: 101, user: doc[0].name});
        } else {
            res.send({code: 200});
        }
        //res.send(doc);
    });
});

module.exports = router;