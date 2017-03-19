/**
 * Created by philic on 2017/3/18.
 */

'user strict';

app.controller('PayCtrl', ['$scope', '$http', '$localStorage', function($scope, $http, $localStorage) {
    // console.log('haha');
    // console.log($localStorage.cart);
    // $scope.bookCart = $localStorage.cart;
    // $scope.bookBill = {};
    // $scope.bookBill.books = [];
    // $scope.bookBill.price = 0;
    console.log($localStorage.bookBill);
    $scope.bookBill = $localStorage.bookBill.books;
    $scope.billPrice = 0;
    for(var i=0;i<$scope.bookBill.length;i++) {
        $scope.billPrice += $scope.bookBill[i].book.price*$scope.bookBill[i].count;
    }
    $scope.billPrice = Math.round($scope.billPrice*100)/100;
    $scope.rmBook = function(index) {

    }
}]);
