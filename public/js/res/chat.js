/**
 * Created by philic on 2017/4/14.
 */
/**
 * Created by philic on 2017/3/18.
 */

'user strict';

app.controller('ChatCtrl', ['$scope', '$http', '$localStorage', '$state',
    function($scope, $http, $localStorage, $state) {
        $scope.roomList = [];
        $scope.chosenRoom = {};
        $scope.msgList = [];
        var marginLeft = '-'+Math.round(window.innerWidth*0.2)+'px';
        $scope.chatStyle = {
            "margin-bottom" : '150px',
            "margin-left"   : marginLeft
        };
        
        $scope.socket = io.connect('/chat');
        $scope.socket.on('welcome', function() {
            $scope.socket.emit('link', {
                userId: $scope.user.userId,
                username: $scope.user.name
            });
        });
        
        $scope.socket.on('fresh', function(data) {
            $scope.$apply(function() {
                $scope.roomList = [];
                data.rooms.map(function(item) {
                    $scope.roomList.push({
                        selected: false,
                        roomInfo: item
                    });
                });
            });
        });
        
        $scope.socket.on('init', function(data) {
            $scope.$apply(function() {
                $scope.roomList[data.index].selected = true;
                $scope.chosenRoom = $scope.roomList[data.index];
            });
        });
        
        $scope.socket.on('say', function(data) {
            console.log(data.msg);
            var temCate = '';
            if(data.userId === 0) {
                temCate = 'success';
            } else if(data.userId === $scope.user.userId) {
                temCate = 'info';
            } else {
                temCate = 'primary';
            }
            $scope.$apply(function() {
                $scope.msgList.push({
                    time: data.time,
                    username: data.username,
                    cate: temCate,
                    content: data.msg
                });
             });
            console.log($scope.msgList);
        });

        $scope.initRoom = function() {
            if($scope.user && $scope.user.au_manager) {
                $scope.msgList = new Array();
                $scope.socket.emit('host', {
                    userId: $scope.user.userId,
                    username: $scope.user.name,
                    socketId: $scope.socket.id
                });
            }
        };

        $scope.enterRoom = function(index) {
            // if($scope.chosenRoom.host.userId && ($scope.chosenRoom.host.userId === $scope.roomList[index].host.userId )) {
            //     return;
            // }
            $scope.msgList = new Array();
            console.log('enter room '+ index);
            $scope.roomList.map(function (item) {
                item.selected = false;
            });
            $scope.roomList[index].selected = true;
            $scope.chosenRoom = $scope.roomList[index];
            console.log($scope.chosenRoom);
            $scope.socket.emit('join', {
                socketId: $scope.socket.id,
                userId: $scope.user.userId,
                username: $scope.user.name,
                index: index
            });
        };

        $scope.sendMessage = function() {
            //console.log($scope.chosenRoom);
            console.log($scope.user);
            if($scope.messageBuffer.length) {
                $scope.socket.emit('say', {
                    roomId: $scope.chosenRoom.roomInfo.host.userId,
                    userId: $scope.user.userId,
                    username: $scope.user.name,
                    msg: $scope.messageBuffer
                });
                $scope.messageBuffer = '';
            }
        }
    }
]);


