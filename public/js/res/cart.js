/**
 * Created by philic on 2017/3/18.
 */

'user strict';

app.controller('CartCtrl', ['$scope', '$http', '$localStorage', function($scope, $http, $localStorage) {
    console.log('haha');
    console.log($localStorage.cart);
    $http({
        method: 'POST',
        url: '/cart/getBooksInCart',
        data: {
            ids: $localStorage.cart
        }
    }).then(function success(res){
        $scope.bookCart = res.data;
    }, function error(err){
        console.log(err);
    })
}]);
