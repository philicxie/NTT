/**
 * Created by philic on 2017/3/18.
 */
'user strict';

app.controller('MainPageCtrl', ['$state', '$scope', '$http', '$localStorage', function($state, $scope, $http, $localStorage) {
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
                return;
            }
        }
        var newBook = {
            index: $localStorage.cart.length,
            book: temBook,
            count: 1,
            paying: false
        };
        $localStorage.cart.push(newBook);
    }
    $scope.buyBook = function(temBook) {
        temBook = JSON.parse(temBook);
        var newBook = {
            index: 0,
            book: temBook,
            count: 1,
            paying: true
        };
        $localStorage.bookBill = {};
        $localStorage.bookBill.books = [];
        $localStorage.bookBill.books.push(newBook);
        $state.go('app.pay');
    }
}]);
