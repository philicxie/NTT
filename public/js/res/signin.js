/**
 * Created by philic on 2017/3/18.
 */
'use strict';

/* Controllers */
// signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
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
        }, function error(err){
            console.log(err);
        });
        // $http.post('api/login', {email: $scope.user.email, password: $scope.user.password})
        //     .then(function(response) {
        //         if ( !response.data.user ) {
        //             $scope.authError = 'Email or Password not right';
        //         }else{
        //             $state.go('app.dashboard-v1');
        //         }
        //     }, function(x) {
        //         $scope.authError = 'Server Error';
        //     });
    };
}])
;