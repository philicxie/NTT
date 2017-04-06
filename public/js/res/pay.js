/**
 * Created by philic on 2017/3/18.
 */

'user strict';

app.controller('PayCtrl', ['$scope', '$http', '$localStorage', '$stateParams', '$state', function($scope, $http, $localStorage, $stateParams, $state) {

    $scope.bookBill = [];
    $scope.billPrice = 0;
    $scope.key = $stateParams.key;
    if($scope.key) {
        console.log($scope.key);
        $http({
            method: 'POST',
            url: '/pay/getOrderByKey',
            data: {key: $scope.key}
        }).then(function success(res){
            console.log(res.data);
            $scope.bookBill = res.data.books;
            for(var i=0;i<$scope.bookBill.length;i++) {
                $scope.billPrice += $scope.bookBill[i].book.price*$scope.bookBill[i].count;
            }
            $scope.billPrice = Math.round($scope.billPrice*100)/100;
        }, function error(err) {
            console.log(err);
        })
    } else {
        $state.go('app.main');
    }
    
}]);
