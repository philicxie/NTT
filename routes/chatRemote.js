/**
 * Created by philic on 2017/4/14.
 */

var express = require('express');
var router = express.Router();

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


io.on('connection', function(socket) {
    socket.emit('news', {hello: 'chat remote world'});
    socket.on('my other event', function(data) {
        console.log(data);
    });
});



module.exports = router;