/**
 * Created by philic on 2017/4/14.
 */

var redis = require("redis");
var client = redis.createClient();
client.on("error", function (err) {
    console.log("Error " + err);
});


module.exports = function (socket) {
    socket.emit('welcome', {});
    socket.emit('fresh', {rooms: global.activeRooms});

    socket.on('link', function(req) {
        console.log(socket.id);
        console.log(req);
        client.set(req.userId, socket.id, redis.print);
        client.expire(req.userId, 20*60);

        global.activeLinks.push({
            userId:     req.userId,
            username:   req.username,
            socketId:   socket.id
        });

    });

    socket.on('drop', function(req) {
        console.log(req);
        delete global.activeLinks[req.socketId];
    });
    


    socket.on('host', function(req) {

        var chatRoom = {
            title: req.username,
            host: {
                userId: req.userId,
                username: req.username,
                socketId: '/chat#'+req.socketId
            },
            status: 0,
            index: global.activeRooms.length,
            guests: []
        };

        global.activeRooms.push(chatRoom);
        global.activeLinks.map(function (item) {
            if(socket.nsp.sockets[item.socketId]) {
                socket.nsp.sockets[item.socketId].emit('fresh', {rooms: activeRooms});
                socket.emit('init', {index: chatRoom.index});
            }
        });
        
        var temDate = new Date();
        var temMsg = {
            msg: '欢迎 ' + req.username + ' 加入房间',
            userId: 0,
            time: temDate.getHours()+':'+temDate.getMinutes(),
            username: '系统消息'
        };

        socket.nsp.sockets[global.activeRooms[chatRoom.index].host.socketId].emit('say', temMsg);

        client.keys("#", function(err, doc) {
            doc.map(function(item) {
                if(socket.nsp.sockets[item.socketId]) {
                    socket.nsp.sockets[item.socketId].emit('fresh', {rooms: activeRooms});
                    socket.emit('init', {index: chatRoom.index});
                }
            });
        });

    });

    socket.on('quit', function(req) {

    });

    socket.on('kill', function(req) {

    });

    socket.on('join', function(req) {
        var initGuest = {
            userId: req.userId,
            username: req.username,
            socketId: '/chat#'+req.socketId
        };

        global.activeRooms[req.index].guests.push(initGuest);

        var temDate = new Date();
        var temMsg = {
            msg: '欢迎 ' + req.username + ' 加入房间',
            userId: 0,
            time: temDate.getHours()+':'+temDate.getMinutes(),
            username: '系统消息'
        };
        global.activeRooms[req.index].guests.map(function (guest) {
            console.log(guest.socketId);
            if(socket.nsp.sockets[guest.socketId]) {
                socket.nsp.sockets[guest.socketId].emit('say', temMsg);
            }
        });
        if(socket.nsp.sockets[global.activeRooms[req.index].host.socketId]) {
            socket.nsp.sockets[global.activeRooms[req.index].host.socketId].emit('say', temMsg);
        }
        // global.activeRooms[req.index].host.io.emit('say', temMsg);
        //global.activeRooms[req.userId].guests.push(initGuest);
        //console.log(global.activeLinks);
        //console.log(initGuest);

    });

    socket.on('say', function(req) {
        //console.log(req);
        // global.activeRooms[req.index].host.io.emit('say', {msg: req.msg});
        // global.activeRooms[req.index].guests.map(function (item) {
        //     item.io.emit('say', {msg: req.msg});
        // });
        client.expire(req.userId, 20*60);

        var temDate = new Date();
        var temMsg = {
            msg: req.msg,
            userId: req.userId,
            username: req.username,
            time: temDate.getHours()+':'+temDate.getMinutes()
        };

        global.activeRooms.map(function(room) {
            if(room.host.userId === req.roomId) {
                room.guests.map(function (guest) {
                    if(socket.nsp.sockets[guest.socketId]) {
                        socket.nsp.sockets[guest.socketId].emit('say', temMsg);
                    }
                });
                if(socket.nsp.sockets[room.host.socketId]) {
                    socket.nsp.sockets[room.host.socketId].emit('say', temMsg);
                }
            }
        });
    });
};