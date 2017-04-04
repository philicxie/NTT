/**
 * Created by philic on 2017/3/22.
 */
/**
 * Created by philic on 2017/3/18.
 */
var User = require('../routes/db').user;
var express = require('express');
var router = express.Router();

router.post('/getAllUsers', function(req, res, next) {
    User.find(function(err, doc) {
        if(err) return console.error(err);
        res.send(doc);
    });
});


router.post('/addUser', function(req, res, next) {
    console.log(req);
    var addUser = new User({
        name: req.body.name,
        account: req.body.account,
        password: 'asdffdsa',
        auth_code:   req.body.au_admin*16 +
                req.body.au_jg*8 +
                req.body.au_kj*4 +
                req.body.au_rw*2 +
                req.body.au_jk
    });
    addUser.save(function(err, doc) {
        if(err) return console.error(err);
        res.send(doc._id);
    });
});

router.post('/rmUserById', function(req, res, next) {
    User.remove({_id:req.body._id}, function(err, doc) {
        if(err) res.send(err);
        res.send(doc);
    })
});

router.post('/updateUserById', function(req, res, next) {
    console.log(req.body);
    
    User.find({_id: req.body._id}, function(err, doc) {
        if(err) res.error(err);
        doc[0].name = req.body.name;
        doc[0].auth_code = req.body.au_admin*16 +
            req.body.au_jg*8 +
            req.body.au_kj*4 +
            req.body.au_rw*2 +
            req.body.au_jk;
        doc[0].save();
        res.send(doc[0]._id);
    });
});

module.exports = router;