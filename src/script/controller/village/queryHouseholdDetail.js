myApp.controller("householdDetail", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var queryHouseholdDetail = {} || queryHouseholdDetail;
		queryHouseholdDetail.urlParam = $stateParams;
		queryHouseholdDetail.sendParam = {};

		queryHouseholdDetail.uploadSource = function() {
			console.log(12123123);

			//根据贫困户id
		}

		console.log(queryHouseholdDetail.urlParam);

		/*queryHouseholdDetail.menu=false;
		queryHouseholdDetail.changeMenu=function(args){
			queryHouseholdDetail.menu=args;
			console.log(queryHouseholdDetail.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.queryHouseholdDetail = queryHouseholdDetail;
	}
]);