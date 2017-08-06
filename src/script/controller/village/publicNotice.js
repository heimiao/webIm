myApp.controller("publicNotice", ["$scope", "$state", "$http", "$stateParams","postForm","$timeout",
	function($scope, $state, $http, $stateParams,postForm,$timeout) {
		var publicNotice = {} || publicNotice;
		publicNotice.urlParam = $stateParams;
		publicNotice.sendParam = {};
		publicNotice.sendParam.time=null;

		
		$scope.publicNotice = publicNotice;
	}
]);