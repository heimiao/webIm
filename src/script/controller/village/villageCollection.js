myApp.controller("villageCollection", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var villageCollection = {} || villageCollection;
		villageCollection.urlParam = $stateParams;
		villageCollection.sendParam = {};
		villageCollection.townShip = []; //全部乡镇列表
		villageCollection.villageListAll = []; //获取全部行政村
		villageCollection.pkcsx = "01"; //贫困村属性默认选中
		villageCollection.fzfxsx = "zx"; //发展方向属性 默认选中
		villageCollection.dxdmsx = "sq"; //地形地貌属性 默认选中
		// 获取所有乡镇
		$http.post(config.path.townShip,null).success(function(res){
			villageCollection.qyxz = res[0].id;
			villageCollection.townShip = res;
		})
		// 获取所有行政村
		$http.post(config.path.villageAll,null).success(function(res){
			villageCollection.qyxzc = res[0].id;
			villageCollection.villageListAll = res;
		})




		/*lowFamilyInfo.menu=false;
		lowFamilyInfo.changeMenu=function(args){
			lowFamilyInfo.menu=args;
			console.log(lowFamilyInfo.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.villageCollection = villageCollection;
	}
]);