/**
 * Created by philic on 2017/4/6.
 */
/**
 * Created by philic on 2017/3/20.
 */
app.controller('BooksManageCtrl', ['$scope', '$http', '$filter', '$modal', function($scope, $http, $filter, $modal) {

    var temDic = {"jg":'经济/管理', "kj":'科学/教育', "rw":'人文/社科', 'jl':'健康/旅游'};
    // $http({
    //     method: 'POST',
    //     url: '/books_manage/getBook'
    // })
    console.log($scope.user);
    $scope.reqCates = [];
    if($scope.user.au_jg) {$scope.reqCates.push('jg')}
    if($scope.user.au_kj) {$scope.reqCates.push('kj')}
    if($scope.user.au_rw) {$scope.reqCates.push('rw')}
    if($scope.user.au_jl) {$scope.reqCates.push('jl')}
    $http({
        method: 'POST',
        url: '/books_manage/getBooksByCates',
        data : {category: $scope.reqCates}
    }).then(function success(res){
        console.log(res);
        $scope.groups = $scope.reqCates;
        $scope.bookCates = [];
        $scope.groups.map(function (item){
            $scope.bookCates.push({
                cate: temDic[item],
                value: item,
                selected: false
            });
        });
        $scope.books = [];
        res.data.map(function(item) {
            $scope.books.push({
                selected: false,
                bookInfo: item
            });
        });
        $scope.book = $scope.books[0];
    }, function error(err){
        console.log(err);
    });
    // $http({
    //     method: 'POST',
    //     url: '/facility/getFacilityCates',
    //     data: {}
    // }).then(function success(res){
    //     console.log(res);
    //     $scope.cates = res.data;
    //     $scope.groups = [];
    //     $scope.options = $scope.cates;
    //     $scope.hstep = $scope.options[0];
    //     res.data.map(function(item){
    //         $scope.groups.push({name: item});
    //     });
    //     $http({
    //         method: 'POST',
    //         url: '/facility/getAllFacility',
    //         data: {}
    //     }).then(function success(res){
    //         console.log(res);
    //         $scope.items = res.data;
    //         $scope.item = $filter('orderBy')($scope.items, 'uid')[0];
    //         $scope.group = $scope.item.name;
    //         $scope.item.selected = true;
    //         $scope.filters = $scope.item.name;
    //     });
    // });



    $scope.checkItem = function(obj, arr, key){
        var i=0;
        angular.forEach(arr, function(item) {
            if(item[key].indexOf( obj[key] ) == 0){
                var j = item[key].replace(obj[key], '').trim();
                if(j){
                    i = Math.max(i, parseInt(j)+1);
                }else{
                    i = 1;
                }
            }
        });
        return obj[key] + (i ? ' '+i : '');
    };

    $scope.selectGroup = function(item){
        angular.forEach($scope.bookCates, function(item) {
            item.selected = false;
        });
        $scope.bookCate = item;
        $scope.bookCate.selected = true;
        $scope.filters = item.value;
        $scope.hstep = item.value;
        console.log($scope.hstep);
    };

    $scope.selectItem = function(item){
        angular.forEach($scope.books, function(item) {
            item.selected = false;
        });
        $scope.book = item;
        $scope.book.selected = true;
    };

}]);



