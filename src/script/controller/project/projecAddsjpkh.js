myApp.controller("projectAddsjpkh", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var projectAddsjpkh = {} || projectAddsjpkh;
		projectAddsjpkh.urlParam = $stateParams;
		projectAddsjpkh.sendParam = {};
<<<<<<< HEAD

		window.localStorage.setItem('projectType', '2');
=======
		projectAddsjpkh.townShip = []; //全部乡镇列表
		projectAddsjpkh.villageListAll = []; //获取全部行政村
>>>>>>> 39ccbd0822b661ebd192df38ccbd67c13a78ec6a
		// 获取所有乡镇
		$http.post(config.path.townShip,null).success(function(res){
			projectAddsjpkh.townShip = res;
			projectAddsjpkh.sendParam.qyxz=res[0].id;
			projectAddsjpkh.getVillageList(res[0].id, 1); //获取乡镇对应的行政村
		})
		// 获取所有行政村
		projectAddsjpkh.getVillageList= function(id, num){
			$http.post(config.path.villageAll+"&fid="+id,null).success(function(res){
				projectAddsjpkh.sendParam.qyxzc = res[0].id;
				projectAddsjpkh.villageListAll = res;
			})
<<<<<<< HEAD
		}
		// 乡镇变化行政村跟随变化
		projectAddsjpkh.changeTown=function(){
			projectAddsjpkh.getVillageList(projectAddsjpkh.sendParam.qyxz, 1); //获取乡镇对应的行政村
		}

		projectAddsjpkh.addPkh = function(){
			for(var i=0;i<projectAddsjpkh.townShip.length;i++){
				if(projectAddsjpkh.sendParam.qyxz == projectAddsjpkh.townShip[i].id){
					projectAddsjpkh.qyzcName = projectAddsjpkh.townShip[i].name;
				}
			}
			for(var i=0;i<projectAddsjpkh.villageListAll.length;i++){
				if(projectAddsjpkh.sendParam.qyxzc == projectAddsjpkh.villageListAll[i].id){
					projectAddsjpkh.qyxzcName = projectAddsjpkh.villageListAll[i].name;
				}
			}
			var addPkc= window.localStorage.getItem("projectGetpkhlist")?JSON.parse(window.localStorage.getItem("projectGetpkhlist")):[];
				addPkc.push(projectAddsjpkh.sendParam);
			var addpkcName = window.localStorage.getItem("projectGetpkhlistName")?JSON.parse(window.localStorage.getItem("projectGetpkhlistName")):[];
				addpkcName.push({
					'qyzcName': projectAddsjpkh.qyzcName,
					'qyxzcName': projectAddsjpkh.qyxzcName,
					'sfzh': projectAddsjpkh.sendParam.sfzh,
					'syje': projectAddsjpkh.sendParam.syje
				});
			window.localStorage.setItem('projectGetpkhlist', JSON.stringify(addPkc))
			window.localStorage.setItem('projectGetpkhlistName', JSON.stringify(addpkcName))
			window.history.back() 
		}
=======
		}

		// 乡镇变化行政村跟随变化
		projectAddsjpkh.changeTown=function(){
			projectAddsjpkh.getVillageList(projectAddsjpkh.sendParam.qyxz, 1); //获取乡镇对应的行政村
		}

>>>>>>> 39ccbd0822b661ebd192df38ccbd67c13a78ec6a
		/*lowFamilyInfo.menu=false;
		lowFamilyInfo.changeMenu=function(args){
			lowFamilyInfo.menu=args;
			console.log(lowFamilyInfo.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.projectAddsjpkh = projectAddsjpkh;
	}
]);