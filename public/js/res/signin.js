/**
 * Created by philic on 2017/3/18.
 */
'use strict';

/* Controllers */
// signin controller
app.controller('SigninFormController', ['$localStorage', '$scope', '$http', '$state', function($localStorage, $scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {
        $scope.authError = null;
        // Try to login
        $http({
            method:'POST',
            url: '/signin/checkUser',
            data: {
                account: $scope.user.email,
                password: $scope.user.password
            }
        }).then(function success(res){
            console.log(res);
            res = res.data;
            if(res.code===101) {
                $localStorage.user = {};
                $localStorage.user.name = res.name;
                $state.go('app.main');
            }
            if(res.code===200) {
                $scope.authError = 'Email or Password not right';
            }
        }, function error(err){
            console.log(err);
        });
    };
}])
;