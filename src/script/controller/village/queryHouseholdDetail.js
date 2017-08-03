myApp.controller("householdDetail", ["$scope", "$state", "$http", "$stateParams","postForm",
	function($scope, $state, $http, $stateParams, postForm) {
		var queryHouseholdDetail = {} || queryHouseholdDetail;
		queryHouseholdDetail.urlParam = $stateParams;
		queryHouseholdDetail.sendParam = {};
		window.localStorage.setItem('queryPoorId', $stateParams.id);
		queryHouseholdDetail.poorId = window.localStorage.getItem('queryPoorId');
		queryHouseholdDetail.list = {}; //存数据
		// 获取所有乡镇
		$http.post(config.path.townShip,null).success(function(res){
			queryVillageDetail.townShip = res;
			// 获取所有行政村
			$http.post(config.path.villageAll,null).success(function(res){
				queryVillageDetail.villageListAll = res;
				queryVillageDetail.getData(); //首页加载列表数据
			})
		})
		postForm.saveFrm(config.path.lowFamilyList,{'id': queryHouseholdDetail.poorId}).success(function(res){
			if(res.success){
				queryHouseholdDetail.list = res.results[0];
			}
		})
		$scope.queryHouseholdDetail = queryHouseholdDetail;
	}
]);