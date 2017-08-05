myApp.controller("projectEdit", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var projectEdit = {} || projectEdit;
		projectEdit.urlParam = $stateParams;
		projectEdit.sendParam = {};
		projectEdit.townShip = []; //全部乡镇列表
		projectEdit.villageListAll = []; //获取全部行政村
		projectEdit.sendParam.nd = "2017";
		projectEdit.sendParam.detailId = $stateParams.detailId;
		// // 获取所有乡镇
		// $http.post(config.path.townShip,null).success(function(res){
		// 	projectEdit.townShip = res;
		// 	projectEdit.sendParam.qyxz=res[0].id;
		// 	projectEdit.getVillageList(res[0].id, 1); //获取乡镇对应的行政村
		// })
		// 获取所有行政村
		projectEdit.getVillageList= function(id, num){
			$http.post(config.path.villageAll+"&fid="+id,null).success(function(res){
				projectEdit.sendParam.qyxzc = res[0].id;
				projectEdit.villageListAll = res;
			})
		}
		// 乡镇变化行政村跟随变化
		projectEdit.changeTown=function(){
			projectEdit.getVillageList(projectEdit.sendParam.qyxz, 1); //获取乡镇对应的行政村
		}

		// 获取所有乡镇
		$http.post(config.path.townShip,null).success(function(res){
			projectEdit.townShip = res;
			// 获取所有行政村
			$http.post(config.path.villageAll,null).success(function(res){
				projectEdit.villageListAll = res;
				//获取项目类型queryZjzdXmlx
				$http.post(config.path.queryZjzdXmlx,null).success(function(res){
					projectEdit.xmleListAll = res;
					//从数据字典获取项目类型的选项
					$http.post(config.path.projectsjzd,null).success(function(res){
						projectEdit.xmleList=res;
						projectEdit.getData(); //首页加载列表数据
					})
				})
			})
		})
		projectEdit.getData = function(){
			$http.post(config.path.queryXmxxDetail+"?id="+projectEdit.sendParam.detailId,null).success(function(res){
				// for(var i=0;i<projectEdit.townShip.length;i++){
				// 	if(res.qyxz == projectEdit.townShip[i].id){
				// 		res.qyxz = projectEdit.townShip[i].name
				// 	}
				// }
				// for(var i=0;i<projectEdit.villageListAll.length;i++){
				// 	if(res.qyxzc == projectEdit.villageListAll[i].id){
				// 		res.qyxzc = projectEdit.villageListAll[i].name
				// 	}
				// }
				// for(var i=0;i<projectEdit.xmleListAll.length;i++){
				// 	if(res.xmlx == projectEdit.xmleListAll[i].id){
				// 		res.xmlx = projectEdit.xmleListAll[i].name
				// 	}
				// 	if(res.xmjd == projectEdit.xmleListAll[i].id){
				// 		res.xmjd = projectEdit.xmleListAll[i].name
				// 	}
				// }
				projectEdit.sendParam = res;
			})
			$http.post(config.path.queryXmxxpkh+"?xmxxid="+projectEdit.sendParam.detailId,null).success(function(res){
				for(var r=0;r<res.length;r++){
					for(var i=0;i<projectEdit.townShip.length;i++){
						if(res[r].qyxz == projectEdit.townShip[i].id){
							res[r].qyxz = projectEdit.townShip[i].name
						}
					}
					for(var i=0;i<projectEdit.villageListAll.length;i++){
						if(res[r].qyxzc == projectEdit.villageListAll[i].id){
							res[r].qyxzc = projectEdit.villageListAll[i].name
						}
					}
				}
				//queryprojectDetails.pkh = res;
			})
			$http.post(config.path.queryXmxxpkc+"?xmxxid="+projectEdit.sendParam.detailId,null).success(function(res){
				for(var r=0;r<res.length;r++){
					for(var i=0;i<projectEdit.townShip.length;i++){
						if(res[r].qyxz == projectEdit.townShip[i].id){
							res[r].qyxz = projectEdit.townShip[i].name
						}
					}
					for(var i=0;i<projectEdit.villageListAll.length;i++){
						if(res[r].qyxzc == projectEdit.villageListAll[i].id){
							res[r].qyxzc = projectEdit.villageListAll[i].name
						}
					}
				}
				//queryprojectDetails.pkc = res;
			})
		}
		//projectEdit.getpeojectlx()

		

		
		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.projectEdit = projectEdit;
	}
]);