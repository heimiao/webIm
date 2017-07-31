myApp.controller("queryNaturalResult", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var queryNaturalResult = {} || queryNaturalResult;
		queryNaturalResult.urlParam = $stateParams;
		queryNaturalResult.sendParam = {};

		queryNaturalResult.uploadSource = function() {
			console.log(12123123);

			//根据贫困户id
		}

		console.log(queryNaturalResult.urlParam);

		/*lowFamilyInfo.menu=false;
		lowFamilyInfo.changeMenu=function(args){
			lowFamilyInfo.menu=args;
			console.log(lowFamilyInfo.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.queryNaturalResult = queryNaturalResult;
	}
]);