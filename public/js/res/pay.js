/**
 * Created by philic on 2017/3/18.
 */

'user strict';

app.controller('PayCtrl', ['$scope', '$http', '$localStorage', function($scope, $http, $localStorage) {
    console.log('haha');
    console.log($localStorage.cart);
    $scope.bookCart = $localStorage.cart;
    $scope.rmBook = function(index) {

    }
}]);
