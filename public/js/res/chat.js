/**
 * Created by philic on 2017/4/14.
 */
/**
 * Created by philic on 2017/3/18.
 */

'user strict';

app.controller('ChatCtrl', ['$scope', '$http', '$localStorage', '$modal', '$state',
    function($scope, $http, $localStorage, $modal, $state) {
        $scope.socket = io.connect('/chat');
        // console.log(socket);
        // socket.on('news', function (data) {
        //     console.log(data);
        //     socket.emit('my other event', {my: 'data'});
        // });
        $scope.roomList = [];
        $scope.chosenRoom = {};
        $http({
            method: 'POST',
            url: '/chat/getActiveRooms',
            data: {}
        }).then(function success(res) {
            console.log(res.data);
            if(res.data.code === 200) {
                res.data.rooms.map(function(item) {
                    $scope.roomList.push({
                        selected: false,
                        roomInfo: item
                    });
                });
            }
            console.log($scope.roomList);
        });
        $scope.initRoom = function() {
            console.log($scope.user);
            if($scope.user && $scope.user.au_manager) {
                $http({
                    method: 'POST',
                    url: '/chat/initRoom',
                    data: {
                        userId: $scope.user.userId,
                        socketId: $scope.socket.id
                    }
                }).then(function success(res) {
                    console.log(res);
                    if(res.data.code === 200) {
                        $scope.roomList.push({
                            selected: true,
                            roomInfo: res.data.room
                        });
                        $scope.chosenRoom = res.data.room;
                        for(var i=0;i<$scope.roomList.length-1;i++) {
                            $scope.roomList[i].selected = false;
                        }


                    }
                });
            }
        };

        $scope.enterRoom = function(index) {
            console.log('enter room '+ index);
            $scope.roomList.map(function (item) {
                item.selected = false;
            });
            $scope.roomList[index].selected = true;
            $scope.chosenRoom = $scope.roomList[index];
        };

        $scope.sendMessage = function() {
            console.log($scope.messageBuffer);
            $scope.messageBuffer = '';
        }
    }
]);


