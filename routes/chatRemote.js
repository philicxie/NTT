/**
 * Created by philic on 2017/4/14.
 */
var User = require('../routes/db').user;
var express = require('express');
var router = express.Router();

router.post('/getActiveRooms', function(req, res, next) {
    console.log(global.activeRooms);
    if(!global.activeRooms || global.activeRooms.length === 0) {
        res.send({
            code: 201
        });
    } else {
        res.send({
            code: 200,
            rooms: global.activeRooms
        });
    }
});

router.post('/initRoom', function(req, res, next) {
    console.log(req.body);
    User.find({_id: req.body.userId}, function(err, doc) {
        if(err) {
            res.send({
                code: 300
            });
            return console.error(err);
        }
        if(doc[0].auth_code%16) {
            var chatRoom = {
                title: doc[0].name,
                host: {
                    userId: doc[0]._id,
                    socketId: req.body.socketId
                },
                status: 0,
                index: global.activeRooms.length,
                guests: []
            };
            global.activeRooms.push(chatRoom);
            res.send({
                code: 200,
                room: chatRoom
            });
        } else {
            res.send({
                code: 301
            });
        }

    });
});



module.exports = router;