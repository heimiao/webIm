myApp.controller("lowFamilyInfoCtro", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var lowFamilyInfo = {} || lowFamilyInfo;
		lowFamilyInfo.urlParam = $stateParams;

		lowFamilyInfo.sendParam = {};

		/*lowFamilyInfo.menu=false;
		lowFamilyInfo.changeMenu=function(args){
			lowFamilyInfo.menu=args;
			console.log(lowFamilyInfo.menu);
		}*/
		
		/*$scope.goback = function() {
			alert();
		}*/
		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.lowFamilyInfo = lowFamilyInfo;
	}
]);