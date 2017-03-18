/**
 * Created by philic on 2017/3/18.
 */
'user strict';
console.log('this is main');

app.controller('MainPageCtrl', ['$scope', '$http', function($scope, $http) {
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
    // $scope.bookGroup = {
    //    
    // };
    
}]);
