/**
 * Created by philic on 2017/3/18.
 */

'user strict';

app.controller('CartCtrl', ['$scope', '$http', '$localStorage', '$modal', function($scope, $http, $localStorage, $modal) {
    console.log($localStorage.cart);
    $scope.bookCart = $localStorage.cart;

    // style config -------------------------
    var countBtnWidth = Math.round(window.innerWidth*0.1*1.1) + 'px';
    console.log(countBtnWidth);
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
            // $http({
            //     method: 'POST',
            //     url: '/authority/rmUserById',
            //     data: {_id: userId}
            // }).then(function success(res){
            //     $state.reload();
            // }, function(err) {
            //     console.log(err);
            // });
        }, function() {
            console.log('dismissed');
        });
    }
}]);

app.controller('RmBookModalCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {
    console.log('rm book modal loaded');
    $scope.temRm = $scope;

    $scope.ok = function(){
        $modalInstance.close();
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}]);
