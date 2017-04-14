/**
 * Created by philic on 2017/4/14.
 */


module.exports = function (socket) {
    console.log('someone connected');
    console.log(socket.nsp);
    console.log(this);
    console.log(this === socket.nsp);
    socket.emit('news', {hello: 'chat remote world'});
};