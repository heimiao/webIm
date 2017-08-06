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
			//getassistPersonList
			postForm.saveFrm(config.path.getassistPersonList,{'id': queryHouseholdDetail.poorId}).success(function(res){
				if(res.success){
					queryHouseholdDetail.bfdxList = res.results;
				}
			})
			//getLowFamilyList
			postForm.saveFrm(config.path.getLowFamilyList,{'id': queryHouseholdDetail.poorId}).success(function(res){
				if(res.success){
					var YHZGX = [
						    {'value': "01", 'name': "本人或户主"}, {'value': "02", 'name': "配偶"}, {'value': "03", 'name': "之子"},
						    {'value': "04", 'name': "之女"}, {'value': "05", 'name': "之儿媳"}, {'value': "06", 'name': "之女婿"},
						    {'value': "07", 'name': "之孙子"}, {'value': "08", 'name': "之孙女"}, {'value': "09", 'name': "之外孙子"},
						    {'value': "10", 'name': "之外孙女"}, {'value': "11", 'name': "之父"}, {'value': "12", 'name': "之母"},
						    {'value': "13", 'name': "之岳父"}, {'value': "14", 'name': "之岳母"}, {'value': "15", 'name': "之公公"},
						    {'value': "16", 'name': "之婆婆"}, {'value': "17", 'name': "之祖父"}, {'value': "18", 'name': "之祖母"},
						    {'value': "19", 'name': "之外祖父"}, {'value': "20", 'name': "之外祖母"}, {'value': "99", 'name': "其他"}
						]
					for(var i=0;i<res.results.length;i++){
						for(var r=0;r<YHZGX.length;r++){
							if(res.results[i].yhzgx == YHZGX[r].value){
								res.results[i].yhzgx = YHZGX[r].name
							}
						}
					}
					queryHouseholdDetail.getLowFamilyList = res.results;
				}
			})
		}
		
		$scope.queryHouseholdDetail = queryHouseholdDetail;
	}
]);