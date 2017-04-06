/**
 * Created by philic on 2017/3/18.
 */

'user strict';

app.controller('CartCtrl', ['$scope', '$http', '$localStorage', '$modal', '$state', function($scope, $http, $localStorage, $modal, $state) {
    console.log($localStorage.cart);
    $scope.bookCart = $localStorage.cart;
    $scope.bookCart.map(function(item) {
        item.paying = false;
    });
    $scope.billPrice = 0;
    $scope.payingAll = false;

    // style config -------------------------
    var countBtnWidth = Math.round(window.innerWidth*0.1*1.1) + 'px';
    $scope.countBtnStyle = {
        "width":              countBtnWidth,
        "border":             "1px solid",
        "border-color":       "red",
        "background-color":   "#FFFFFF"
    };
    var submitBtnMargin = Math.round(window.innerWidth*0.1*0.1) + 'px';
    var submitBtnWidth  = Math.round(window.innerWidth*0.1*0.8) + 'px';
    $scope.submitBtnStyle = {
        "width": submitBtnWidth,
        "margin-left": submitBtnMargin
    };
    //!style config -------------------------
    $scope.rmBook = function(index) {
        console.log('rm user clicked' + index);
        var rmUserModalInstance = $modal.open({
            templateUrl: 'RmBook',
            controller: 'RmBookModalCtrl',
            size: 'sm'
        });
        rmUserModalInstance.result.then(function success() {

        }, function() {
            console.log('dismissed');
        });
    };

    $scope.choseBook = function(index) {
        console.log('chose book clicked' + index);
        console.log($scope.bookCart);
        $scope.bookCart[index].paying = !$scope.bookCart[index].paying;
        $scope.payingAll = true;
        $scope.bookCart.map(function (item){
            $scope.payingAll &= item.paying;
        });
        $scope.countPrice();
    };

    $scope.choseAll = function() {
        console.log('chose all');
        if($scope.payingAll) {
            $scope.payingAll = false;
            $scope.bookCart.map(function (item){
                item.paying = false;
            });
        } else {
            $scope.payingAll = true;
            $scope.bookCart.map(function (item){
                item.paying = true;
            });
        }
        $scope.countPrice();
    }
    $scope.countPrice = function() {
        $scope.billPrice = 0;
        $scope.bookCart.map(function (item){
            if(item.paying) {
                $scope.billPrice += item.count * item.book.price;
            }
        });
        $scope.billPrice = Math.round($scope.billPrice*100)/100;
    }
    
    $scope.generateBill = function() {
        console.log('ready to generate bill');
        $http({
            method: 'POST',
            url: '/cart/newBill',
            data: {}
        }).then(function success(res){
            console.log(res);
        }, function error(err){
            console.log(err);
        });
        //$state.go('app.pay');
    }
}]);

app.controller('RmBookModalCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {
    $scope.temRm = $scope;

    $scope.ok = function(){
        $modalInstance.close();
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}]);
