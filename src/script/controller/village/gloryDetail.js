myApp.controller("gloryDetail", ["$scope", "$state", "$http", "$stateParams","postForm","$timeout",
	function($scope, $state, $http, $stateParams,postForm,$timeout) {
		var gloryDetail = {} || gloryDetail;
		gloryDetail.urlParam = $stateParams;
		gloryDetail.sendParam = {};
		gloryDetail.sendParam.time=null;

		
		$scope.gloryDetail = gloryDetail;
	}
]);