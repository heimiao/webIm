//草稿箱控制器 
myApp.controller("lowFamilyDraftCtro", ["$scope", "$state", "$filter", "$http", "$stateParams", function($scope, $state, $filter, $http, $stateParams) {
	$scope.userId = "";
	var lowFamilyDraft = {} || lowFamilyDraft;
	//获取参数
	lowFamilyDraft.urlParam = $stateParams;
	lowFamilyDraft.sendParam = {};
	lowFamilyDraft.page = {
		page: 1,
		size: 15,
	};
	lowFamilyDraft.list = {};
	//获取当前用户信息  

	//根据角色遍历响应的菜单
	$scope.lowFamilyDraft = lowFamilyDraft;
}]);