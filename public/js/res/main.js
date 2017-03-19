/**
 * Created by philic on 2017/3/18.
 */
'user strict';

app.controller('MainPageCtrl', ['$scope', '$http', '$localStorage', function($scope, $http, $localStorage) {
    if($localStorage.cart===undefined) {
        $localStorage.cart = new Array();
    }
    //$localStorage.cart = new Array();
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
    
    $scope.addCart = function(temBook) {
        temBook = JSON.parse(temBook);
        for(var i=0;i<$localStorage.cart.length;i++) {
            if($localStorage.cart[i].book._id===temBook._id) {
                $localStorage.cart[i].count = $localStorage.cart[i].count*1+1;
                console.log($localStorage.cart);
                return;
            }
        }
        var newBook = {
            index: $localStorage.cart.length,
            book: temBook,
            count: 1,
            paid: true
        };
        $localStorage.cart.push(newBook);
        console.log($localStorage.cart);
    }
    
}]);
