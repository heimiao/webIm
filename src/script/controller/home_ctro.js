myApp.controller("home", ["$scope", "$rootScope", "$state", "$http", "$stateParams", "postForm",
    function($scope, $rootScope, $state, $http, $stateParams, postForm) {


        //根据角色遍历响应的菜单
        $scope.low_family_baseInfo = low_family_baseInfo;
    }
]);