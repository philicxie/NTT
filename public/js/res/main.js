/**
 * Created by philic on 2017/3/18.
 */
'user strict';

app.controller('MainPageCtrl', ['$scope', '$http', '$localStorage', function($scope, $http, $localStorage) {
    if($localStorage.cart===undefined) {
        $localStorage.cart = new Array();
    }
    console.log('haha');
    $scope.category = 'sh';
    $http({
        method:'POST',
        url: '/main/getBooksByCate',
        data: {
            category: $scope.category
        }
    }).then(function success(res){
        console.log(res);
        $scope.bookGroup = res.data;
        
    }, function error(err){
        console.log(err);
    });
    
    $scope.oneAtATime = true;
    
    $scope.addCart = function(bookId) {
        console.log(bookId);
        $localStorage.cart.push(bookId);
        console.log($localStorage.cart);
    }
    
}]);
