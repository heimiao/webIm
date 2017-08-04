myApp.controller("projectEdit", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var projectEdit = {} || projectEdit;
		projectEdit.urlParam = $stateParams;
		projectEdit.sendParam = {};


		console.log(projectEdit.urlParam);

		/*lowFamilyInfo.menu=false;
		lowFamilyInfo.changeMenu=function(args){
			lowFamilyInfo.menu=args;
			console.log(lowFamilyInfo.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.projectEdit = projectEdit;
	}
]);