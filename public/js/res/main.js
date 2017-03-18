/**
 * Created by philic on 2017/3/18.
 */
'user strict';
console.log('this is main');

app.controller('MainPageCtrl', ['$scope', '$http', function($scope, $http) {

    $http({
        method:'POST',
        url: '/main/getBooksByCate',
        data: {
            category: 'sh'
        }
    }).then(function success(res){
        console.log(res);
    }, function error(err){
        console.log(err);
    });
    
    $scope.oneAtATime = true;
    $scope.bookGroup = {
        
    };
    
}]);
