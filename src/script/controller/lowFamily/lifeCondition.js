myApp.controller("lifeConditionCtro", ["$scope", "$rootScope", "$state", "$http", "$stateParams", "postForm",
	function($scope, $rootScope, $state, $http, $stateParams, postForm) {
		$scope.userId = "";
		$scope.dataType = "";
		var lifeCondition = lifeCondition || {};
		
		$scope.lifeCondition = lifeCondition;
	}
]);