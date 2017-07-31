myApp.controller("poorVillage", ["$scope", "$state", "$http", "$stateParams","postForm",
	function($scope, $state, $http, $stateParams, postForm) {
		var poorVillage = {} || poorVillage;
		poorVillage.urlParam = $stateParams;
		poorVillage.sendParam = {};
		poorVillage.list = {}; //查询列表
		poorVillage.townShip = []; //全部乡镇列表
		poorVillage.villageList = []; //全部行政村列表
		poorVillage.sendParam.townShipId = null;
		poorVillage.sendParam.villageListId = null;
		poorVillage.sendParam.year = null;
		poorVillage.sendParam.time = null;
		$http.post(config.path.townShip,null).success(function(res){
			poorVillage.townShip = res;
		})
		poorVillage.chooseTownship=function(name,id){
			poorVillage.sendParam.townShipId = id;
			$("#township .name").html(name)
			$(".townshipList").slideUp(200)
			$("#township").removeClass("township2")
			$("#township .name").removeClass("col-ea3c4c")
			$http.post(config.path.villageAll+id,null).success(function(res){
				poorVillage.villageList = res;
				console.log(poorVillage.villageList)
			})
		}
		poorVillage.chooseVillage=function(name,id){
			poorVillage.sendParam.villageListId = id;
			$("#village .name").html(name)
			$(".villageList").slideUp(200)
			$("#village").removeClass("township2")
			$("#village .name").removeClass("col-ea3c4c")
		}
		poorVillage.chooseTime=function(time){
			poorVillage.sendParam.time = time;
			$("#time .name").html(time)
			$(".timeList").slideUp(200)
			$("#time").removeClass("township2")
			$("#time .name").removeClass("col-ea3c4c")
		}

		// $http.post(config.path.villageList+'nd='+poorVillage.sendParam.time+'&limit=10&start=0&qyxz='+poorVillage.sendParam.townShipId+'&qyxzc='+poorVillage.sendParam.villageListId,null).success(function(res){
		// 	poorVillage.townShip = res;
		// })
		poorVillage.datas = {
			"nd": poorVillage.sendParam.time,
			"limit":　10,
			"start": 0,
			"qyxz": poorVillage.sendParam.townShipId,
			"qyxzc": poorVillage.sendParam.villageListId,
		}
		postForm.saveFrm(config.path.villageList,poorVillage.datas).success(function(res){
			if(res.success){
				for(var r=0;r<res.results.length;r++){
					for(var i=0;i<poorVillage.townShip.length;i++){
						if(res.results[r].qyxz == poorVillage.townShip[i].id){
							res.results[r].qyxz = poorVillage.townShip[i].name
						}
					}
				}
				for(var r=0;r<res.results.length;r++){
					for(var i=0;i<poorVillage.villageList.length;i++){
						if(res.results[r].qyxzc == poorVillage.villageList[i].id){
							res.results[r].qyxzc = poorVillage.villageList[i].name
						}
					}
				}
				poorVillage.list = res.results;
			}
		})
		 // poorVillage.list=data.poorVillage.results;
		
		/*poorVillage.menu=false;
		poorVillage.changeMenu=function(args){
			poorVillage.menu=args;
			console.log(poorVillage.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.poorVillage = poorVillage;
	}
]);