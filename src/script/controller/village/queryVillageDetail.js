myApp.controller("queryVillageDetail", ["$scope", "$state", "$http", "$stateParams","$timeout","postForm",
	function($scope, $state, $http, $stateParams,$timeout, postForm) {
		var queryVillageDetail = {} || queryVillageDetail;
		queryVillageDetail.urlParam = $stateParams;
		queryVillageDetail.sendParam = {};
		queryVillageDetail.list = [];
		queryVillageDetail.detailId = $stateParams.detailId;
		queryVillageDetail.detailList = [];
		queryVillageDetail.taskForceList = [];
		// 获取所有乡镇
		$http.post(config.path.townShip,null).success(function(res){
			queryVillageDetail.townShip = res;
			// 获取所有行政村
			$http.post(config.path.villageAll,null).success(function(res){
				queryVillageDetail.villageListAll = res;
				queryVillageDetail.getData(); //首页加载列表数据
			})
		})
		$http.post(config.path.getTaskForce+queryVillageDetail.detailId,null).success(function(res){
			queryVillageDetail.taskForceList = res;
			if(queryVillageDetail.taskForceList.length == 0){
				queryVillageDetail.noData = true;
			}else{
				queryVillageDetail.noData = false;
			}
		})
		queryVillageDetail.getData = function(){
			$http.post(config.path.editVillageCollection+queryVillageDetail.detailId,null).success(function(res){
					res.pkcsx = res.pkcsx == "01"?"贫困村":res.pkcsx == "02"?"十二五贫困村":res.pkcsx == "03"?"十三五贫困村":res.pkcsx == "04"?"非贫困村":"无";
					res.fzfxsx = res.fzfxsx == "zx"?"中心村镇":res.fzfxsx == "gd"?"过渡村镇":res.fzfxsx == "yb"?"一般村镇":"无";
					res.dxdmsx = res.dxdmsx == "sq"?"山区村镇":res.dxdmsx == "ql"?"丘陵村镇":res.dxdmsx == "pb"?"平坝村镇":"无";
					res.zwjb = res.zwjb?res.zwjb:'无'
					for(var i=0;i<queryVillageDetail.townShip.length;i++){
						if(res.qyxz == queryVillageDetail.townShip[i].id){
							res.qyxz = queryVillageDetail.townShip[i].name
						}
					}
					for(var i=0;i<queryVillageDetail.villageListAll.length;i++){
						if(res.qyxzc == queryVillageDetail.villageListAll[i].id){
							res.qyxzc = queryVillageDetail.villageListAll[i].name
						}
					}
				queryVillageDetail.detailList = res;
			})
		}
		
		$scope.queryVillageDetail = queryVillageDetail;
	}
]);