myApp.controller("noticeDetail", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var noticeDetail = {} || noticeDetail;
		noticeDetail.urlParam = $stateParams;
		noticeDetail.sendParam = {};

		
		$scope.noticeDetail = noticeDetail;
	}
]);