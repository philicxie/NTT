/**
 * Created by philic on 2017/3/18.
 */
'user strict';

app.controller('MainPageCtrl', ['$modal', '$state', '$scope', '$http', '$localStorage', '$stateParams', '$rootScope', function($modal, $state, $scope, $http, $localStorage, $stateParams, $rootScope) {
    if($localStorage.cart===undefined) {
        $localStorage.cart = new Array();
    }
    console.log($scope.user);
    //$localStorage.cart = new Array();
    $scope.user = $rootScope.user;
    // if($localStorage.user!==undefined) {
    //     $scope.user = {};
    //     $scope.user.name = $localStorage.user.name;
    // }
    $scope.category = $stateParams.category;
    if(!$scope.category) {
        $scope.category = 'jg';
    }
    var temDic = {"jg":'经济/管理', "kj":'科学/教育', "rw":'人文/社科', 'jl':'健康/旅游'};
    $scope.PageTitle = temDic[$scope.category];
    $http({
        method:'POST',
        url: '/main/getBooksByCate',
        data: {
            category: $scope.category
        }
    }).then(function success(res){
        $scope.bookGroup = res.data;
    }, function error(err){
        console.log(err);
    });

    $scope.oneAtATime = true;

    $scope.addCart = function(temBook) {
        temBook = JSON.parse(temBook);
        console.log(temBook);
        console.log($localStorage.cart);
        var hadAdded = false;
        for(var i=0;i<$localStorage.cart.length;i++) {
            if($localStorage.cart[i].book._id===temBook._id) {
                $localStorage.cart[i].count = $localStorage.cart[i].count*1+1;
                hadAdded = true;
            }
        }
        console.log('get here');
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
            templateUrl: 'AddCartModal',
            controller: 'AddCartSuccessCtrl',
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
}]);

app.controller('AddCartSuccessCtrl', ['$scope', '$modalInstance', 'items', '$state', function($scope, $modalInstance, items, $state) {
    console.log('rm book modal loaded');
    $scope.temRm = $scope;

    $scope.cancel = function() {
        console.log('hit eee');
        $modalInstance.close();
    }
    $scope.urefCart = function() {
        console.log('to go');
        $scope.cancel();
        $state.go('app.cart');
    }
}]);

