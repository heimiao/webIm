//经纪人列表
myApp.controller("lowFamilyListCtro", ["$scope", "$state", "$filter", "$http", "$stateParams",function($scope, $state, $filter, $http, $stateParams) {
	var lowFamilyList = {} || lowFamilyList;
	//获取参数
	lowFamilyList.urlParam = $stateParams;
	lowFamilyList.sendParam = {};
	lowFamilyList.page = {
		page: 1,
		size: 15,
	};
	lowFamilyList.list = {};
	//获取当前用户信息  

	//根据角色遍历响应的菜单
	$scope.lowFamilyList = lowFamilyList;
}]);