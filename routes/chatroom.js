/**
 * Created by philic on 2017/4/14.
 */


module.exports = function (socket) {
    console.log('someone connected');
    this.emit('news', {hello: 'chat remote world'});
};