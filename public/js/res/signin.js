'use strict';

/* Controllers */
app.controller('SigninFormController', ['$scope', '$http', '$state', '$rootScope', '$localStorage', function($scope, $http, $state, $rootScope, $localStorage) {
    $rootScope.user = {};
    $scope.authError = null;

    $scope.login = function() {
        $http({
            method: 'POST',
            url: '/signin/checkUser',
            data: {
                account:    $scope.input.account,
                password:   $scope.input.password
            }
        }).then(function success(res) {
            if(res.data.code === 200) {
                console.log(res.data.user);
                //$rootScope.user = res.data.user;
                $rootScope.user = {
                    userId: res.data.user._id,
                    name:   res.data.user.name,
                    au_admin:   Math.floor(res.data.user.auth_code/16 )%2?true:false,
                    au_jg:      Math.floor(res.data.user.auth_code/8  )%2?true:false,
                    au_kj:      Math.floor(res.data.user.auth_code/4  )%2?true:false,
                    au_rw:      Math.floor(res.data.user.auth_code/2  )%2?true:false,
                    au_jl:      Math.floor(res.data.user.auth_code    )%2?true:false,
                    au_manager: res.data.user.auth_code%16 > 0
                };
                console.log($rootScope.user);
                $localStorage.user = $rootScope.user;
                $localStorage.loginTime = new Date();
                $state.go('app.main');
            } else if(res.data.code === 300) {
                $scope.authError = 'Account or Password not right';
            } else if(res.data.code === 500) {
                $scope.authError = 'Sorry, Server Error';
            } else {
                $scope.authError = 'Unknown Error';
            }
        }, function error(err) {
            $scope.authError = 'Unknown Error';
        });
    };
}])
;