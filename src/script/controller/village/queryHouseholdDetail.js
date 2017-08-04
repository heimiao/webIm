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
			queryHouseholdDetail.townShip = res;
			// 获取所有行政村
			$http.post(config.path.villageAll,null).success(function(res){
				queryHouseholdDetail.villageListAll = res;
				$http.post(config.path.xingzhengName+'?lx=03',null).success(function(res){
					queryHouseholdDetail.naturlListAll = res;
					queryHouseholdDetail.getData(); //首页加载列表数据
				})
			})
		})
		queryHouseholdDetail.getData = function(){
			postForm.saveFrm(config.path.lowFamilyList,{'id': queryHouseholdDetail.poorId}).success(function(res){
				if(res.success){
					for(var i=0;i<queryHouseholdDetail.townShip.length;i++){
						if(res.results[0].qyxz == queryHouseholdDetail.townShip[i].id){
							res.results[0].qyxz = queryHouseholdDetail.townShip[i].name
						}
					}
					for(var i=0;i<queryHouseholdDetail.villageListAll.length;i++){
						if(res.results[0].qyxzc == queryHouseholdDetail.villageListAll[i].id){
							res.results[0].qyxzc = queryHouseholdDetail.villageListAll[i].name
						}
					}
					// for(var i=0;i<queryHouseholdDetail.villageListAll.length;i++){
					// 	if(res.results[0].qyxzc == queryHouseholdDetail.villageListAll[i].id){
					// 		res.results[0].qyxzc = queryHouseholdDetail.villageListAll[i].name
					// 	}
					// }
					queryHouseholdDetail.list = res.results[0];
				}
			})
		}
		
		$scope.queryHouseholdDetail = queryHouseholdDetail;
	}
]);