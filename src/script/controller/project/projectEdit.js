myApp.controller("projectEdit", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var projectEdit = {} || projectEdit;
		projectEdit.urlParam = $stateParams;
		projectEdit.sendParam = {};
		projectEdit.townShip = []; //全部乡镇列表
		projectEdit.villageListAll = []; //获取全部行政村
		// 获取所有乡镇
		$http.post(config.path.townShip,null).success(function(res){
			projectEdit.townShip = res;
			projectEdit.sendParam.qyxz=res[0].id;
			projectEdit.getVillageList(res[0].id, 1); //获取乡镇对应的行政村
		})
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

		//从数据字典获取项目类型的选项
		projectEdit.getpeojectlx= function(){
			$http.post(config.path.projectsjzd,null).success(function(res){
				projectEdit.xmleList=res;
				projectEdit.sendParam.xmlx=projectEdit.xmleList[0].id; //默认选中第一个
			})
		}
		projectEdit.getpeojectlx()

		

		
		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.projectEdit = projectEdit;
	}
]);