//经纪人列表
myApp.controller("lowFamilyListCtro", ["$scope", "$state", "$filter", "$http", "$stateParams", function($scope, $state, $filter, $http, $stateParams) {
	var lowFamilyList = {} || lowFamilyList;
	//获取参数
	lowFamilyList.urlParam = $stateParams;
	lowFamilyList.sendParam = {
		nd: 2016
	};
	lowFamilyList.page = {
		limit: 15,
		start: 0,
	};
	lowFamilyList.list = {};
	console.log(111111);
	//获取当前用户信息  
	/*	$http.post(config.path.lowFamilyList).success(function(data) {
			console.log(data);
		})*/

	lowFamilyList.list = data.lowFamilyList.results;

	//根据角色遍历响应的菜单
	$scope.lowFamilyList = lowFamilyList;

}]);