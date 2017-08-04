myApp.controller("queryNaturalDetails", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var queryNaturalDetails = {} || queryNaturalDetails;
		queryNaturalDetails.urlParam = $stateParams;
		queryNaturalDetails.sendParam = {};
		queryNaturalDetails.detailId= $stateParams.detailId;
		// 获取所有行政村
		$http.post(config.path.villageAll,null).success(function(res){
			queryNaturalDetails.villageListAll = res;
			$http.post(config.path.xingzhengName+'?lx=03',null).success(function(res){
				queryNaturalDetails.naturlListAll = res;
				queryNaturalDetails.getDetail(); //首页加载列表数据
			})
		})
		queryNaturalDetails.getDetail= function(){
			$http.post(config.path.zrcDetails+"?id="+queryNaturalDetails.detailId,null).success(function(res){
				for(var i=0;i<queryNaturalDetails.villageListAll.length;i++){
					if(res.lsxzc == queryNaturalDetails.villageListAll[i].id){
						res.lsxzc = queryNaturalDetails.villageListAll[i].name
					}
				}
				for(var i=0;i<queryNaturalDetails.naturlListAll.length;i++){
					if(res.zrcmc == queryNaturalDetails.naturlListAll[i].id){
						res.zrcmc = queryNaturalDetails.naturlListAll[i].name
					}
				}
				queryNaturalDetails.sendParam = res;
			})
		}

		$scope.queryNaturalDetails = queryNaturalDetails;
	}
]);