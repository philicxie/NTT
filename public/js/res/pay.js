/**
 * Created by philic on 2017/3/18.
 */

'user strict';

app.controller('PayCtrl', ['$scope', '$http', '$localStorage', function($scope, $http, $localStorage) {
    console.log('haha');
    console.log($localStorage.cart);
    $scope.bookCart = $localStorage.cart;
    $scope.bookBill = {};
    $scope.bookBill.books = [];
    $scope.bookBill.price = 0;
    for(var i=0;i<$scope.bookCart.length;i++) {
        if($scope.bookCart[i].paid===true) {
            $scope.bookBill.books.push($scope.bookCart[i]);
            $scope.bookBill.price += $scope.bookCart[i].book.price*$scope.bookCart[i].count;
        }
    }
    $scope.bookBill.price = Math.round($scope.bookBill.price*100)/100;
    $scope.rmBook = function(index) {

    }
}]);
