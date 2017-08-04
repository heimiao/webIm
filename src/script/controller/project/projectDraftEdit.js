myApp.controller("projectDraftEdit", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var projectDraftEdit = {} || projectDraftEdit;
		projectDraftEdit.urlParam = $stateParams;
		projectDraftEdit.sendParam = {};

		
		

		/*lowFamilyInfo.menu=false;
		lowFamilyInfo.changeMenu=function(args){
			lowFamilyInfo.menu=args;
			console.log(lowFamilyInfo.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.projectDraftEdit = projectDraftEdit;
	}
]);