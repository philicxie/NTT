/**
 * Created by philic on 2017/3/18.
 */
'user strict';

app.controller('MainPageCtrl', ['$modal', '$state', '$scope', '$http', '$localStorage', '$stateParams', function($modal, $state, $scope, $http, $localStorage, $stateParams) {
    if($localStorage.cart===undefined) {
        $localStorage.cart = new Array();
    }
    //$localStorage.cart = new Array();
    if($localStorage.user!==undefined) {
        $scope.user = {};
        $scope.user.name = $localStorage.user.name;
    }
    console.log('haha');
    $scope.category = $stateParams.category;
    $scope.items = ['item1', 'item2', 'item3'];
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
        var hadAdded = false;
        for(var i=0;i<$localStorage.cart.length;i++) {
            if($localStorage.cart[i].book._id===temBook._id) {
                $localStorage.cart[i].count = $localStorage.cart[i].count*1+1;
                hadAdded = true;
            }
        }
        if(!hadAdded){
            var newBook = {
                index: $localStorage.cart.length,
                book: temBook,
                count: 1,
                paying: false
            };
            $localStorage.cart.push(newBook);
        }
        $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: '',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
    };
    $scope.buyBook = function(temBook) {
        temBook = JSON.parse(temBook);
        var newBook = {
            index: 0,
            book: temBook,
            count: 1,
            paying: true
        };
        //$localStorage.bookBill = {};
        //$localStorage.bookBill.books = [];
        $localStorage.bookBill.books.push(newBook);
        $state.go('app.pay');
    }
    $scope.urefCart = function() {
        console.log('to go');
        $scope.cancel();
        $state.go('app.cart');
    }
}]);

