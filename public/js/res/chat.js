/**
 * Created by philic on 2017/4/14.
 */
/**
 * Created by philic on 2017/3/18.
 */

'user strict';

app.controller('ChatCtrl', ['$scope', '$http', '$localStorage', '$modal', '$state',
    function($scope, $http, $localStorage, $modal, $state) {
        var socket = io.connect('/chat');
        console.log(socket);
        socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', {my: 'data'});
        });
        $scope.roomList = [];
        $scope.chosenRoom = {};
        $http({
            method: 'POST',
            url: '/chat/getActiveRooms',
            data: {}
        }).then(function success(res) {
            console.log(res.data);
            if(res.data.code === 200) {
                $scope.roomList = res.data.rooms;
            }
        });
        $scope.initRoom = function() {
            console.log($scope.user);
            if($scope.user && $scope.user.au_manager) {
                $http({
                    method: 'POST',
                    url: '/chat/initRoom',
                    data: {userId: $scope.user.userId}
                }).then(function success(res) {

                })
            }
        }
    }
]);


