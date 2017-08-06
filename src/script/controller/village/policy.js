myApp.controller("policy", ["$scope", "$state", "$http", "$stateParams","postForm","$timeout",
	function($scope, $state, $http, $stateParams,postForm,$timeout) {
		var policy = {} || policy;
		policy.urlParam = $stateParams;
		policy.sendParam = {};
		policy.sendParam.time=null;

		
		$scope.policy = policy;
	}
]);