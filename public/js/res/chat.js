/**
 * Created by philic on 2017/4/14.
 */
/**
 * Created by philic on 2017/3/18.
 */

'user strict';

app.controller('ChatCtrl', ['$scope', '$http', '$localStorage', '$modal', '$state',
    function($scope, $http, $localStorage, $modal, $state) {
        $scope.roomList = [];
        $scope.chosenRoom = {};
        $scope.msgList = [];

        var time = new Date();
        time = time.getHours()+':'+time.getMinutes();
        $scope.msgList.push({
            time: time,
            username: 'System',
            cate: 'success',
            content: 'Welcome to the chatroom'
        });
        
        $scope.socket = io.connect('/chat');
        $scope.socket.on('welcome', function() {
            $scope.socket.emit('link', {
                userId: $scope.user.userId,
                socketId: $scope.socket.id,
                username: $scope.user.name
            });
        });
        
        $scope.socket.on('fresh', function(data) {
            $scope.roomList = [];
            data.rooms.map(function(item) {
                $scope.roomList.push({
                    selected: false,
                    roomInfo: item
                });
            });
        });
        
        $scope.socket.on('say', function(data) {
            console.log(data.msg);
            $scope.$apply(function() {
                $scope.msgList.push({
                    time: time,
                    username: data.username,
                    cate: 'primary',
                    content: data.msg
                });
             });
            console.log($scope.msgList);
            $scope.fresh();
            //alert(data.msg);
            //this.emit('ok', {});
        });

        $scope.initRoom = function() {
            if($scope.user && $scope.user.au_manager) {
                // $http({
                //     method: 'POST',
                //     url: '/chat/initRoom',
                //     data: {
                //         userId: $scope.user.userId,
                //         socketId: $scope.socket.id
                //     }
                // }).then(function success(res) {
                //     console.log(res);
                //     if(res.data.code === 200) {
                //         $scope.roomList.push({
                //             selected: true,
                //             roomInfo: res.data.room
                //         });
                //         $scope.chosenRoom = res.data.room;
                //         for(var i=0;i<$scope.roomList.length-1;i++) {
                //             $scope.roomList[i].selected = false;
                //         }
                //     }
                // });
                $scope.socket.emit('host', {
                    userId: $scope.user.userId,
                    username: $scope.user.name,
                    socketId: $scope.socket.id
                });

                $scope.socket.on('fresh', function(data) {
                    console.log('room freshed');
                    console.log(data);
                    $scope.roomList = [];
                    data.rooms.map(function(item) {
                        $scope.roomList.push({
                            selected: false,
                            roomInfo: item
                        });
                    });
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
            $scope.socket.emit('join', {
                socketId: $scope.socket.id,
                userId: $scope.user.userId,
                username: $scope.user.name,
                index: index
            });
            $http({
                method: 'POST',
                url: '/chat/getMsgList',
                data: {index: index}
            }).then(function success(res){
                console.log(res);
                $scope.msgList = [];
            });
        };

        $scope.sendMessage = function() {
            console.log($scope.messageBuffer);
            $scope.socket.emit('say', {
                user: $scope.socket.id,
                msg: $scope.messageBuffer
            });
            $scope.messageBuffer = '';
        }

        $scope.fresh = function() {
            console.log('this fresh');
        }
    }
]);


