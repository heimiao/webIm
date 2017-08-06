myApp.controller("policyDetail", ["$scope", "$state", "$http", "$stateParams","postForm","$timeout",
	function($scope, $state, $http, $stateParams,postForm,$timeout) {
		var policyDetail = {} || policyDetail;
		policyDetail.urlParam = $stateParams;
		policyDetail.sendParam = {};
		policyDetail.sendParam.time=null;

		
		$scope.policyDetail = policyDetail;
	}
]);