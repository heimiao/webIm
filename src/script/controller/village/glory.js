myApp.controller("glory", ["$scope", "$state", "$http", "$stateParams","postForm","$timeout",
	function($scope, $state, $http, $stateParams,postForm,$timeout) {
		var glory = {} || glory;
		glory.urlParam = $stateParams;
		glory.sendParam = {};
		glory.sendParam.time=null;

		
		$scope.glory = glory;
	}
]);