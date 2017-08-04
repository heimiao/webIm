myApp.controller("projectAddsjpkc", ["$scope", "$state", "$http", "$stateParams","postForm",
	function($scope, $state, $http, $stateParams,postForm) {
		var projectAddsjpkc = {} || projectAddsjpkc;
		projectAddsjpkc.urlParam = $stateParams;
		projectAddsjpkc.sendParam = {};
		projectAddsjpkc.townShip = []; //全部乡镇列表
		projectAddsjpkc.villageListAll = []; //获取全部行政村
		
		// 获取所有乡镇
		$http.post(config.path.townShip,null).success(function(res){
			projectAddsjpkc.townShip = res;
			projectAddsjpkc.sendParam.qyxz=res[0].id;
			projectAddsjpkc.getVillageList(res[0].id, 1); //获取乡镇对应的行政村
		})
		// 获取所有行政村
		projectAddsjpkc.getVillageList= function(id, num){
			$http.post(config.path.villageAll+"&fid="+id,null).success(function(res){
				projectAddsjpkc.sendParam.qyxzc = res[0].id;
				projectAddsjpkc.villageListAll = res;
			})
		}

		// 乡镇变化行政村跟随变化
		projectAddsjpkc.changeTown=function(){
			projectAddsjpkc.getVillageList(projectAddsjpkc.sendParam.qyxz, 1); //获取乡镇对应的行政村
		}

		//添加扶贫项目涉及贫困村
		projectAddsjpkc.tianjia=function(){
			postForm.saveFrm(config.path.projectaddsjpkca,projectAddsjpkc.sendParam)
			.success(function(res){
				console.log(res);

				alert('123')
			})
		}
















		
		projectAddsjpkc.uploadSource = function() {
			console.log(12123123);

			//根据贫困户id
		}

		console.log(projectAddsjpkc.urlParam);

		/*lowFamilyInfo.menu=false;
		lowFamilyInfo.changeMenu=function(args){
			lowFamilyInfo.menu=args;
			console.log(lowFamilyInfo.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.projectAddsjpkc = projectAddsjpkc;
	}
]);