myApp.controller("queryNatural", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var queryNatural = {} || queryNatural;
		queryNatural.urlParam = $stateParams;
		queryNatural.sendParam = {};
		queryNatural.nd = "2017"; // 年度 默认值
		queryNatural.queryList = function(){
			$state.go('queryNaturalResult', {'nd':queryNatural.nd})
		}
		$scope.queryNatural = queryNatural;
	}
]);