/**
 * Created by philic on 2017/3/18.
 */

'user strict';

app.controller('CartCtrl', ['$scope', '$http', '$localStorage', function($scope, $http, $localStorage) {
    console.log('haha');
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
        
    }
}]);
