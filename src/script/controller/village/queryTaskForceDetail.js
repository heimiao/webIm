myApp.controller("queryTaskForceDetail", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var queryTaskForceDetail = {} || queryTaskForceDetail;
		queryTaskForceDetail.urlParam = $stateParams;
		queryTaskForceDetail.sendParam = {};
		queryTaskForceDetail.id = $stateParams.id;
		queryTaskForceDetail.taskForceList = [];
		$http.post(config.path.getTaskForce+queryTaskForceDetail.id,null).success(function(res){
			queryTaskForceDetail.taskForceList = res[0];
			
		})
		$scope.queryTaskForceDetail = queryTaskForceDetail;
	}
]);