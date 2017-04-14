/**
 * Created by philic on 2017/4/14.
 */
/**
 * Created by philic on 2017/3/18.
 */

'user strict';

app.controller('ChatCtrl', ['$scope', '$http', '$localStorage', '$modal', '$state',
    function($scope, $http, $localStorage, $modal, $state) {
        var socket = io.connect();
        socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', {my: 'data'});
        });
    }
]);


