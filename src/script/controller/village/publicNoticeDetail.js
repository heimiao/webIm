myApp.controller("publicNoticeDetail", ["$scope", "$state", "$http", "$stateParams","postForm","$timeout",
	function($scope, $state, $http, $stateParams,postForm,$timeout) {
		var publicNoticeDetail = {} || publicNoticeDetail;
		publicNoticeDetail.urlParam = $stateParams;
		publicNoticeDetail.sendParam = {};
		publicNoticeDetail.sendParam.time=null;

		
		$scope.publicNoticeDetail = publicNoticeDetail;
	}
]);