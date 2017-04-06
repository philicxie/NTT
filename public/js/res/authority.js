/**
 * Created by philic on 2017/3/22.
 */
app.controller('UserInfoCtrl', ['$http', '$scope', '$modal', '$state', function( $http, $scope, $modal, $state){

    $scope.users = [];
    $http({
        method: 'POST',
        url: '/authority/getAllUsers',
        data: {}
    }).then(function success(res){
        res.data.map(function(item){
            $scope.users.push({
                _id: item._id,
                account: item.account,
                name: item.name,
                au_admin:   Math.floor(item.auth_code/16 )%2?true:false,
                au_jg:      Math.floor(item.auth_code/8  )%2?true:false,
                au_kj:      Math.floor(item.auth_code/4  )%2?true:false,
                au_rw:      Math.floor(item.auth_code/2  )%2?true:false,
                au_jl:      Math.floor(item.auth_code    )%2?true:false
            });
        });
    }, function(err) {
        console.log(err);
    });
    $scope.addUser = function() {
        $scope.userInfo = {
            name: "",
            account: "",
            au_admin: false,
            au_jg: false,
            au_kj: false,
            au_rw: false,
            au_jk: false
        };
        console.log('add user click');
        var addUserModalInstance = $modal.open({
            templateUrl: 'UserInfo',
            controller: 'UserInfoModalCtrl',
            size: '',
            resolve: {
                isNew: function () {
                    return true;
                },
                userInfo: function () {
                    return $scope.userInfo;
                }
            }
        });
        addUserModalInstance.result.then(function (resUser){
            console.log(resUser);
            $http({
                method: 'POST',
                url: '/authority/addUser',
                data: resUser
            }).then(function success(res){
                resUser._id = res.data;
                $scope.users.push(resUser);
            }, function(err){
                console.log(err);
            });
        }, function(){
            console.log('dismissed');
        });
    };
    $scope.rmUser = function(userId) {
        console.log('rm user clicked' + userId);
        var rmUserModalInstance = $modal.open({
            templateUrl: 'RmUser',
            controller: 'RmUserModalCtrl',
            size: 'sm'
        });
        rmUserModalInstance.result.then(function success() {
            $http({
                method: 'POST',
                url: '/authority/rmUserById',
                data: {_id: userId}
            }).then(function success(res){
                $state.reload();
            }, function(err) {
                console.log(err);
            });
        }, function() {
            console.log('dismissed');
        });
    };

    $scope.editUser = function(userId) {
        console.log('edit user clicked' + userId);
        $scope.userInfo = {};
        for(var i=0;i<$scope.users.length;i++) {
            if($scope.users[i]._id === userId) {
                $scope.userInfo = $scope.users[i];
                break;
            }
        }
        console.log($scope.userInfo);
        var editUserModalInstance = $modal.open({
            templateUrl: 'UserInfo',
            controller: 'UserInfoModalCtrl',
            size: '',
            resolve: {
                isNew: function () {
                    return false;
                },
                userInfo: function () {
                    return $scope.userInfo;
                }
            }
        });

        editUserModalInstance.result.then(function (resUser){
            console.log(resUser);
            $http({
                method: 'POST',
                url: '/authority/updateUserById',
                data: resUser
            }).then(function success(res){
                resUser._id = res.data;
                for(var i=0;i<$scope.users.length;i++) {
                    if($scope.users[i]._id === resUser._id) {
                        $scope.users[i] = resUser;
                        console.log(resUser);
                        break;
                    }
                }
            }, function(err){
                console.log(err);
            });
        }, function(){
            console.log('dismissed');
        });
    }
    $scope.pageSync = function() {
        console.log('page sync click');
    }
}]);


app.controller('UserInfoModalCtrl', ['$scope', '$modalInstance', 'isNew', 'userInfo', function($scope, $modalInstance, isNew, userInfo) {
    console.log('modal loaded');
    $scope.temNew = $scope;
    $scope.temNew.isNew = isNew;
    $scope.temNew.userInfo = userInfo;
    $scope.ok = function () {
        console.log($scope.temNew.userInfo);
        $modalInstance.close($scope.temNew.userInfo);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.changeAdmin = function() {
        $scope.temNew.userInfo.au_admin = !$scope.temNew.userInfo.au_admin;
    };
    $scope.changeJG = function() {
        $scope.temNew.userInfo.au_jg = !$scope.temNew.userInfo.au_jg;
    };
    $scope.changeKJ = function() {
        $scope.temNew.userInfo.au_kj = !$scope.temNew.userInfo.au_kj;
    };
    $scope.changeRW = function() {
        $scope.temNew.userInfo.au_rw = !$scope.temNew.userInfo.au_rw;
    };
    $scope.changeJL = function() {
        $scope.temNew.userInfo.au_jl = !$scope.temNew.userInfo.au_jl;
    };
}]);

app.controller('RmUserModalCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {
    console.log('rm user modal loaded');
    $scope.temRm = $scope;

    $scope.ok = function(){
        $modalInstance.close();
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}]);