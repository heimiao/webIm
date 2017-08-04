myApp.controller("queryprojectDetails", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var queryprojectDetails = {} || queryprojectDetails;
		queryprojectDetails.urlParam = $stateParams;
		queryprojectDetails.sendParam = {};
		queryprojectDetails.detailId = $stateParams.detailId;
		queryprojectDetails.info = {};
		queryprojectDetails.pkh = {};
		queryprojectDetails.pkc = {};
		// 获取所有乡镇
		$http.post(config.path.townShip,null).success(function(res){
			queryprojectDetails.townShip = res;
			// 获取所有行政村
			$http.post(config.path.villageAll,null).success(function(res){
				queryprojectDetails.villageListAll = res;
				//获取项目类型queryZjzdXmlx
				$http.post(config.path.queryZjzdXmlx+"?lx=09",null).success(function(res){
					queryprojectDetails.xmlx = res;
					queryprojectDetails.getData(); //首页加载列表数据
				})
			})
		})
		queryprojectDetails.getData = function(){
			$http.post(config.path.queryXmxxDetail+"?id="+queryprojectDetails.detailId,null).success(function(res){
				for(var i=0;i<queryprojectDetails.townShip.length;i++){
					if(res.qyxz == queryprojectDetails.townShip[i].id){
						res.qyxz = queryprojectDetails.townShip[i].name
					}
				}
				for(var i=0;i<queryprojectDetails.villageListAll.length;i++){
					if(res.qyxzc == queryprojectDetails.villageListAll[i].id){
						res.qyxzc = queryprojectDetails.villageListAll[i].name
					}
				}
				for(var i=0;i<queryprojectDetails.xmlx.length;i++){
					if(res.xmlx == queryprojectDetails.xmlx[i].id){
						res.xmlx = queryprojectDetails.xmlx[i].name
					}
				}
				queryprojectDetails.info = res;
			})
			$http.post(config.path.queryXmxxpkh+"?xmxxid="+queryprojectDetails.detailId,null).success(function(res){
				for(var r=0;r<res.length;r++){
					for(var i=0;i<queryprojectDetails.townShip.length;i++){
						if(res[r].qyxz == queryprojectDetails.townShip[i].id){
							res[r].qyxz = queryprojectDetails.townShip[i].name
						}
					}
					for(var i=0;i<queryprojectDetails.villageListAll.length;i++){
						if(res[r].qyxzc == queryprojectDetails.villageListAll[i].id){
							res[r].qyxzc = queryprojectDetails.villageListAll[i].name
						}
					}
				}
				queryprojectDetails.pkh = res;
			})
			$http.post(config.path.queryXmxxpkc+"?xmxxid="+queryprojectDetails.detailId,null).success(function(res){
				for(var r=0;r<res.length;r++){
					for(var i=0;i<queryprojectDetails.townShip.length;i++){
						if(res[r].qyxz == queryprojectDetails.townShip[i].id){
							res[r].qyxz = queryprojectDetails.townShip[i].name
						}
					}
					for(var i=0;i<queryprojectDetails.villageListAll.length;i++){
						if(res[r].qyxzc == queryprojectDetails.villageListAll[i].id){
							res[r].qyxzc = queryprojectDetails.villageListAll[i].name
						}
					}
				}
				queryprojectDetails.pkc = res;
			})
		}
		$scope.queryprojectDetails = queryprojectDetails;
	}
]);