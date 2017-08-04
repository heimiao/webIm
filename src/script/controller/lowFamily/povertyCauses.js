myApp.controller("lowFamilyCausesCtro", ["$scope", "$rootScope", "$state", "$http", "$stateParams", "postForm",
	function($scope, $rootScope, $state, $http, $stateParams, postForm) {
		$scope.userId = "";
		$scope.dataType = "";
		var lowFamilyCauses = lowFamilyCauses || {};

		$scope.lowFamilyCauses = lowFamilyCauses;
	}
]);