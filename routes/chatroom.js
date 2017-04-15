/**
 * Created by philic on 2017/4/14.
 */


module.exports = function (socket) {
    console.log('someone connected');
    // console.log(socket.nsp);
    // console.log(this);
    // console.log(this === socket.nsp);
    socket.emit('welcome', {});
    socket.emit('fresh', {rooms: global.activeRooms});


    socket.on('link', function(req) {
        console.log(req);
        global.activeLinks.push({
            userInfo: {
                userId: req.userId,
                username: req.username
            },
            io: socket
        });
        console.log('show active links');
        console.log(global.activeLinks);
        console.log(global.activeLinks.length);
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
                socketId: req.socketId
            },
            status: 0,
            index: global.activeRooms.length,
            guests: []
        };
        console.log(chatRoom);
        global.activeRooms.push(chatRoom);
        console.log(global.activeLinks);
        // global.activeLinks.map(function (item) {
        //     console.log(item);
        //     item.io.emit('fresh', {rooms: activeRooms});
        // });
        
        for(var key in global.activeLinks) {
            console.log(global.activeLinks[key]);
            global.activeLinks[key].io.emit('fresh', {rooms: activeRooms});
        }

        console.log(global.activeLinks.length);
    });

    socket.on('quit', function(req) {

    });

    socket.on('kill', function(req) {

    });

    socket.on('join', function(req) {
        console.log(req);
        // var initGuest = {
        //     userId: req.userId,
        //     username: req.username,
        //     socketId: req.socketId,
        //     io: socket.nsp
        // };
        // global.activeRooms[req.index].guests.push(initGuest);
    });

    socket.on('say', function(req) {
        console.log(req);
        // global.activeRooms[req.index].host.io.emit('say', {msg: req.msg});
        // global.activeRooms[req.index].guests.map(function (item) {
        //     item.io.emit('say', {msg: req.msg});
        // });
        global.activeLinks.map(function (item){
            item.io.emit('say', {msg: req.msg});
        })
    });
};