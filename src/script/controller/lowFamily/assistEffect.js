//帮扶成效
myApp.controller("assistEffectCtro", ["$scope", "$rootScope", "$state", "$http", "$stateParams", "postForm",
	function($scope, $rootScope, $state, $http, $stateParams, postForm) {
		$scope.userId = "";
		$scope.dataType = "";
		var assistEffect = assistEffect || {};

		$scope.assistEffect = assistEffect;
	}
]);