myApp.controller("queryVillage", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var queryVillage = {} || queryVillage;
		queryVillage.urlParam = $stateParams;
		queryVillage.sendParam = {};
		queryVillage.nd = "2017"; // 年度 默认值

		// 获取所有乡镇
		$http.post(config.path.townShip,null).success(function(res){
			queryVillage.townShip = res;
			queryVillage.qyxz = res[0].id;
			queryVillage.getVillageList(res[0].id, 1); //获取乡镇对应的行政村
		})
		// 乡镇变化行政村跟随变化
		queryVillage.changeTown=function(){
			queryVillage.getVillageList(queryVillage.qyxz); //获取乡镇对应的行政村
		}
		// 获取所有行政村
		queryVillage.getVillageList= function(id, num){
			$http.post(config.path.villageAll+"&fid="+id,null).success(function(res){
				queryVillage.qyxzc = res[0].id;
				queryVillage.villageListAll = res;
			})
		}
		queryVillage.query = function(){
			$state.go('queryVillageList', {'nd':queryVillage.nd,'qyxz':queryVillage.qyxz,'qyxzc': queryVillage.qyxzc})
		}

		$scope.queryVillage = queryVillage;
	}
]);